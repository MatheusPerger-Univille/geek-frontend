import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { NotificationService } from '../notification/notification.service';
import { AuthService } from './auth.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Credenciais } from './credenciais.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	credenciais = new Credenciais();

	email: string;
	senha: string;

	constructor(
		private service: AuthService,
		private usuarioService: UsuarioService,
		private authService: AuthService,
		private router: Router,
		private modalService: MatDialog,
	) { }

	ngOnInit(): void {
		
	}

	onLogar() {

		this.service.login(this.credenciais)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(response => {
				this.authService.successfulLogin(response.headers.get('Authorization'));
				NotificationService.success('Login realizado com sucesso!');
				window.location.reload();
			}, 
				error => NotificationService.error(error.error.message)
			);
	}

	onCriarConta() {
		const modal = this.modalService.open(CadastroComponent);
	}

}
