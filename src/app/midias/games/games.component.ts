import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataTableDirective } from 'angular-datatables';
import { Paging } from '../../core/models/paging.model';
import { GamesPesquisa } from './games-pesquisa.model';
import { Router } from '@angular/router';
import { PagingService } from 'src/app/core/services/paging.service';
import { GamesService } from './games.service';
import { AppConfig } from 'src/app/core/configs/app.configs';
import { Observable } from 'rxjs';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { Game } from './game/game.model';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;
	  
	@ViewChild(DataTableDirective, { static: false })
  	dtElement: DataTableDirective;

	games: GamesPesquisa[];
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
			private gamesService: GamesService
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

				const req: Observable<EntityBase<GamesPesquisa>> = this.gamesService.filtrar(p);

				req.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe((f: EntityBase<GamesPesquisa>) => {

					this.games = f.content;

					this.nenhumRegistro = this.games.length === 0;

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

		const game = this.games[index];
		this.router.navigate(['midias/games/editar', game.id]);
	}

	onClickExcluir(index: number) {

		const game = this.games[index];
	
		NotificationService.confirm(`Deseja continuar a exclusão de ${game.titulo}?`, () => {
			this.excluirRegistro(game.id);
			this.reloadDataTable();
		}, error => {
			NotificationService.error('Ocorreu um erro ao tentar excluir o game.');
		});
		
	}

	reloadDataTable() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

	private excluirRegistro(id: number) {
		this.blockUI.start();

		this.gamesService.excluir(id).subscribe(r => {
			NotificationService.success('Registro excluído com sucesso!');
			this.reloadDataTable();
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
				this.router.navigateByUrl('midias/games/criar');
			}
		};
	}
}
