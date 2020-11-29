import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { AppConfig } from 'src/app/core/configs/app.configs';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { Paging } from 'src/app/core/models/paging.model';
import { PagingService } from 'src/app/core/services/paging.service';
import { UsuarioService } from '../usuario.service';
import { UsuarioPesquisa } from './usuario-pesquisa.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;
	  
	@ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

	usuarios: UsuarioPesquisa[];
	paginacao: Paging;
	dtOptions: any = {};
	ordenacao = [[0, 'desc']];
	nenhumRegistro = true;

	colunas = [
		{ data: 'id', orderable: true },
		{ data: 'nome', orderable: true },
		{ data: 'permissao', orderable: false },
		{ data: '', orderable: false },
	];

    constructor(
		private router: Router,
		private pgService: PagingService,
		private service: UsuarioService
	) { }

    ngOnInit(): void {

		this.carregarDataTable();
	}
	
	carregarDataTable() {

		this.dtOptions = {
			serverSide: true,
			processing: true,
			language: {
				url: AppConfig.DATATABLE_LANGUAGE,
			},
			dom: AppConfig.TABLE_RESULTS_SEARCH,
			ajax: (data, callback) => {

				const p = this.paginacao ? this.paginacao : this.pgService.build(data, this.colunas);

				const req: Observable<EntityBase<UsuarioPesquisa>> = this.service.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<UsuarioPesquisa>) => {

					this.usuarios = f.content;

					this.nenhumRegistro = this.usuarios.length === 0;

					callback({
						rerecordsTotal: f.totalElements,
						recordsFiltered: f.totalElements,
						data: []
					});
				}, error => {
					NotificationService.error('Ocorreu um erro ao recuperar os dados.');
				});
			},
			columns: this.colunas,
			order: this.ordenacao,
			pageLength: AppConfig.PAGE_SIZE,
			lengthMenu: AppConfig.TABLE_PAGELENGTH_OPTIONS,
			buttons: {
				dom: {
					button: {
						tag: 'button',
						className: 'btn',
					}
				},
				buttons: [
					this.botaoCriar()
				]
			}
		};

	}

	botaoCriar() {
		return {
			text: `<i class="fa fa-plus"></i>`,
			className: 'btn-outline-success',
			key: { key: 'n', altKey: true },
			action: () => {
				this.router.navigateByUrl('/usuarios/criar');
			}
		};
	}

	onClickEditar(index: number) {

		const usuario = this.usuarios[index];
		this.router.navigate(['usuarios/editar', usuario.id]);
	}

	onClickExcluir(index: number) {

		const usuario = this.usuarios[index];
	
		NotificationService.confirm(`Deseja continuar a exclusão de ${usuario.nome}?`, () => {
			this.excluirRegistro(usuario.id);
		}, error => {
			NotificationService.error('Ocorreu um erro ao tentar excluir o usuario.');
		});
		
	}

	private reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

	private excluirRegistro(id: number) {
		this.blockUI.start();

		this.service.excluir(id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(r => {
				NotificationService.success('Registro excluído com sucesso!');
				this.reloadDataTable();
			},
				error => NotificationService.error(`Algo deu errado durante a exclusão do registro: ${error.error.message}.`)
			);
	}

}
