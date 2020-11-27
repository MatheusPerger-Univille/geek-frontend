import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataTableDirective } from 'angular-datatables';
import { Paging } from '../../core/models/paging.model';
import { LivrosPesquisa } from './livros-pesquisa.model';
import { Router } from '@angular/router';
import { PagingService } from 'src/app/core/services/paging.service';
import { LivrosService } from './livros.service';
import { AppConfig } from 'src/app/core/configs/app.configs';
import { Observable } from 'rxjs';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { Livro } from './livro/livro.model';


@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

	@BlockUI() 
	  blockUI: NgBlockUI;
	  
	@ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

	livros: LivrosPesquisa[];
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
		private livrosService: LivrosService
  ) {}

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

				const req: Observable<EntityBase<LivrosPesquisa>> = this.livrosService.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<LivrosPesquisa>) => {

					this.livros = f.content;

					this.nenhumRegistro = this.livros.length === 0;

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

	onClickEditar(index: number) {

		const livro = this.livros[index];
		this.router.navigate(['midias/livros/editar', livro.id]);
	}

	onClickExcluir(index: number) {

		const livro = this.livros[index];
	
		NotificationService.confirm(`Deseja continuar a exclusão de ${livro.titulo}?`, () => {
			this.excluirRegistro(livro.id);
			this.reloadDataTable();
		}, error => {
			NotificationService.error('Ocorreu um erro ao tentar excluir o filme.');
		});
		
	}

	reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

	private excluirRegistro(id: number) {
		this.blockUI.start();

		this.livrosService.excluir(id).subscribe(r => {
			NotificationService.success('Registro excluído com sucesso!');
			this.blockUI.stop();
		}, error => {
			NotificationService.error(`Algo deu errado durante a exclusão do registro`);
			this.blockUI.stop();
		});
	}

  botaoCriar() {
		return {
			text: `<i class="fa fa-plus"></i>`,
			className: 'btn-outline-success',
			key: { key: 'n', altKey: true },
			action: () => {
				this.router.navigateByUrl('midias/livros/criar');
			}
		};
	}
}
