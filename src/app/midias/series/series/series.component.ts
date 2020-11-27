import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
import { SeriesService } from '../../series/series.service';
import { SeriesPesquisa } from './series-pesquisa.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;
	  
	@ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

  	series: SeriesPesquisa[];
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
		private seriesService: SeriesService
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

				const req: Observable<EntityBase<SeriesPesquisa>> = this.seriesService.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<SeriesPesquisa>) => {

					this.series = f.content;

					this.nenhumRegistro = this.series.length === 0;

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
				this.router.navigateByUrl('midias/series/criar');
			}
		};
  	}
  
	onClickEditar(index: number) {

		const serie = this.series[index];
		this.router.navigate(['midias/series/editar', serie.id]);
  	}
  
  	onClickExcluir(index: number) {

		const serie = this.series[index];
	
		NotificationService.confirm(`Deseja continuar a exclusão de ${serie.titulo}?`, () => {
			this.excluirRegistro(serie.id);
		}, 
			error => NotificationService.error(`Ocorreu um erro ao tentar excluir a série. ${error.error.message}`)
		);
		
  	}
  
	private reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
  	}

  
	private excluirRegistro(id: number) {

		this.blockUI.start();

		this.seriesService.excluir(id)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(r => {
				NotificationService.success('Registro excluído com sucesso!');
				this.reloadDataTable();
			}, 
				error => NotificationService.error(`Algo deu errado durante a exclusão do registro. ${error.error.message}`)
			);
	}
}
