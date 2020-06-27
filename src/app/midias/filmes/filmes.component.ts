import { Component, OnInit } from '@angular/core';
import { Paging } from '../../core/models/paging.model';
import { Router } from '@angular/router';
import { PagingService } from '../../core/services/paging.service';
import { Observable } from 'rxjs';
import { EntityBase } from '../../core/models/entity-base.model';
import { FilmesService } from './filmes.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppConfig } from '../../core/configs/app.configs';
import { FilmesPesquisa } from './filmes-pesquisa.model';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
	selector: 'app-filmes',
	templateUrl: './filmes.component.html',
	styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

	@BlockUI() 
  	blockUI: NgBlockUI;

	filmes: FilmesPesquisa[];
	paginacao: Paging;
	dtOptions: any = {};
	ordenacao = [[1, 'desc']];

	teste: FilmesPesquisa[] = [
		{id: 1, dataLancamento: new Date(), titulo: 'Velozes 8'},
		{id: 2, dataLancamento: new Date(), titulo: 'Velozes 7'},
		{id: 3, dataLancamento: new Date(), titulo: 'Velozes 6'},
	]

	colunas = [
		{ data: 'nome', orderable: true },
		{ data: 'data', orderable: true }
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
			dom: '<"row"<"col-sm-12 datatable-buttons text-right"B>> <"row"<"col-sm-6"l><"col-sm-6 pull-right"f>> rt<"row"<"col-sm-6"i><"col-sm-6 pull-right"p>>',
			ajax: (data, callback) => {

				const p = this.paginacao ? this.paginacao : this.pgService.build(data, this.colunas);

				const req: Observable<EntityBase<FilmesPesquisa>> = this.filmesService.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<FilmesPesquisa>) => {

					this.filmes = f.content;

					callback({
						rerecordsTotal: f.totalElements,
						recordsFiltered: f.totalElements,
						data: []
					});
				}, error => { // RETIRAR APÓS BACKEND
					this.filmes = this.teste;

					callback({
						rerecordsTotal: 3,
						recordsFiltered: 3,
						data: []
					});
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
		});
		
	}

	private excluirRegistro(id: number) {
		this.blockUI.start();

		this.filmesService.excluir(id).subscribe(r => {
			NotificationService.success('Registro excluído com sucesso!');
			this.blockUI.stop();
		}, error => {
			NotificationService.error(`Algo deu errado durante a exclusão do registro`);
			this.blockUI.stop();
		});
	}

}
