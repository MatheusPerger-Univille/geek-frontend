import { Component, OnInit, ViewChild } from '@angular/core';
import { Paging } from '../../core/models/paging.model';
import { Router } from '@angular/router';
import { PagingService } from '../../core/services/paging.service';
import { Observable } from 'rxjs';
import { EntityBase } from '../../core/models/entity-base.model';
import { FilmesService } from './filmes.service';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { AppConfig } from '../../core/configs/app.configs';
import { FilmesPesquisa } from './filmes-pesquisa.model';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataTableDirective } from 'angular-datatables';

@Component({
	selector: 'app-filmes',
	templateUrl: './filmes.component.html',
	styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;
	  
	@ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

	filmes: FilmesPesquisa[];
	paginacao: Paging;
	dtOptions: any = {};
	ordenacao = [[1, 'desc']];
	nenhumRegistro = true;

	colunas = [
		{ data: 'id', orderable: true },
		{ data: 'titulo', orderable: true },
		{ data: 'dataLancamento', orderable: true },
		{ data: '', orderable: false },
	];

	constructor(
		private router: Router,
		private pgService: PagingService,
		private filmesService: FilmesService
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

				const req: Observable<EntityBase<FilmesPesquisa>> = this.filmesService.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<FilmesPesquisa>) => {

					this.filmes = f.content;

					this.nenhumRegistro = this.filmes.length === 0;

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
				this.router.navigateByUrl('midias/filmes/criar');
			}
		};
	}

	onClickEditar(index: number) {

		const filme = this.filmes[index];
		this.router.navigate(['midias/filmes/editar', filme.id]);
	}

	onClickExcluir(index: number) {

		const filme = this.filmes[index];
	
		NotificationService.confirm(`Deseja continuar a exclusão de ${filme.titulo}?`, () => {
			this.excluirRegistro(filme.id);
		}, error => {
			NotificationService.error('Ocorreu um erro ao tentar excluir o filme.');
		});
		
	}

	private reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

	private excluirRegistro(id: number) {
		this.blockUI.start();

		this.filmesService.excluir(id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(r => {
				NotificationService.success('Registro excluído com sucesso!');
				this.reloadDataTable();
			},
				error => NotificationService.error(`Algo deu errado durante a exclusão do registro: ${error.error.message}.`)
			);
	}

}
