import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';
import { FilmesService } from '../filmes/filmes.service';
import { LivrosService } from '../livros/livros.service';
import { Avaliacao, Comentario } from '../midia.model';
import { SeriesService } from '../series/series.service';
import { AvaliacaoService } from './avaliacao.service';
import { ComentarioService } from './comentario.service';

@Component({
  selector: 'app-detalhamento',
  templateUrl: './detalhamento.component.html',
  styleUrls: ['./detalhamento.component.css']
})
export class DetalhamentoComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	dadosDetalhamento: any;

	id: number;

	tipo: TipoMidia;

	comentario: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private filmeService: FilmesService,
		private serieService: SeriesService,
		private livroService: LivrosService,
		private comentarioService: ComentarioService,
		private avaliacaoService: AvaliacaoService,
	) {

		this.id = +this.route.snapshot.paramMap.get("id");
		this.tipo = TipoMidia[this.route.snapshot.paramMap.get("tipo")];
		
	}

	ngOnInit(): void {

		if (this.id && this.tipo) {
			this.puxarDadosDetalhamento();
		}
		
	}

	private puxarDadosDetalhamento() {

		let service;

		switch (this.tipo) {
			case TipoMidia.FILME:

				service = this.filmeService;
				break;
			case TipoMidia.SERIE:
				
				service = this.serieService;
				break;
			case TipoMidia.LIVRO:
				
				service = this.livroService;
				break;
			case TipoMidia.GAME:
				// TODO
				break;
		
			default:
				NotificationService.info('Tipo inválido!');
				this.router.navigateByUrl('');
				break;
		}

		service.obterPorId(this.id)
				.subscribe(
					v => this.dadosDetalhamento = v,
					e => this.showError(e)
				);
	}

	private showError(error: any) {

		NotificationService.error(error.error.message);
		this.router.navigateByUrl('');
	}

	onComentar() {

		this.blockUI.start('Salvando comentário...');

		const comentario = {
			...new Comentario(),
			comentario: this.comentario,
			idMidia: this.id,
			tipoMidia: this.tipo
		};

		this.comentarioService.salvar(comentario)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(v => {
				NotificationService.success('Comentário inserido com sucesso!');
				window.location.reload();
			},
				error => NotificationService.error(`Ocorreu um erro com o comentário. ${error.error.message}`)
			);
	}

	onAvaliar(nota: number) {

		this.blockUI.start('Salvando avaliação...');

		const avaliacao = {
			...new Avaliacao(),
			nota: nota,
			idMidia: this.id,
			tipoMidia: this.tipo
		};

		this.avaliacaoService.salvar(avaliacao)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe(v => {
				NotificationService.success('Avaliaçãp inserida com sucesso!');
				window.location.reload();
			},
				error => NotificationService.error(`Ocorreu um erro com a avaliação. ${error.error.message}`)
			);
	}

}
