import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { Permissao } from 'src/app/core/models/enums/permissao.enum';
import { UsuarioService } from '../usuario.service';
import { Usuario } from './usuario.model';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	esconderSenha = true;

	id: number;

	permissaoEnum = Permissao;

	get isUserPermissaoVoltar(): boolean {
		return this.service.isAdmin;
	}

	constructor(private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		public service: UsuarioService) {

			this.id = this.route.snapshot.params['id'];
		}

	ngOnInit(): void {

		this.criarFormulario();

		if (this.id) {
			this.service.obterPorId(this.id)
				.pipe(finalize(() => this.blockUI.stop()))
				.subscribe(
					v => this.path(v),
					error => {
						NotificationService.error(`Ocorreu um erro ao recuperar os dados. ${error.error.message}`);
						this.irParaListagem();
					}
				);
		}
	}

	private criarFormulario() {
		this.formGroup = this.fb.group({
            nome: this.fb.control('', Validators.required),
            email: this.fb.control('', [Validators.required, Validators.email]),
            senha: this.fb.control('', Validators.required),
            apelido: this.fb.control(''),
            uf: this.fb.control(''),
            cidade: this.fb.control(''),
            permissao: this.fb.control(Permissao.USUARIO, Validators.required),
        });
	}

	irParaListagem() {
		this.router.navigateByUrl('/usuarios');
	}

	onVoltar() {
		if (this.isUserPermissaoVoltar) {
			this.irParaListagem();
		} else {
			this.router.navigateByUrl('');
		}
		
	}

	onSalvar() {
		
		const formValues = this.formGroup.getRawValue();

		const valuesSave = {
			id: this.id,
			nome: formValues.nome,
			email: formValues.email,
			senha: formValues.senha,
			apelido: formValues.apelido,
			uf: formValues.uf,
			cidade: formValues.cidade,
			permissao: this.isUserPermissaoVoltar ? formValues.permissao : Permissao.USUARIO
		}

		this.service.salvar(valuesSave)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(result => {
				NotificationService.success(`Usuário salvo com sucesso.`);
				this.irParaListagem();
			},
				error => NotificationService.error(`Ocorreu uma falha ao tentar salvar o usuário. ${error.error.message}`)
			);
	}

	private path(values: Usuario) {

		this.formGroup.patchValue({
			nome: values.nome,
			email: values.email,
			senha: values.senha,
			apelido: values.apelido,
			uf: values.uf,
			cidade: values.cidade,
			permissao: values.permissao
		});
	}

}
