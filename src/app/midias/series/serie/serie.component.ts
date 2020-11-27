import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AbstractComponentComponent } from 'src/app/core/components/shared/abstract-component/abstract-component.component';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';
import { FilmeSerie } from '../../filme-serie.model';
import { Midia } from '../../midia.model';
import { SeriesService } from '../series.service';
import { Serie } from './serie.model';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})

export class SerieComponent extends AbstractComponentComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	dadosIniciaisValidos = false;
	
	informacoesValidas = false;

	imagemCapaValida = false;

	serie = new Serie();
	
	isEdicao = false;

  constructor(private router: Router,
		private route: ActivatedRoute,
    private seriesService: SeriesService
    ) {
      super(TipoMidia.SERIE);
   }

  ngOnInit(): void {
  
		const id = +this.route.snapshot.paramMap.get("id");

		if (id) {
			this.carregarValoresEdicao(id);
    }
    
  }

	private carregarValoresEdicao(id: number) {

		this.seriesService.obterPorId(id).subscribe(result => {
			this.setarValoresEdicao(result);
		}, error => {
			NotificationService.error(`Ocorreu um erro ao recuperar a serie: ${error.error.message}`);
        	this.irParaListagem();
		});
  }

	private setarValoresEdicao(values: Serie) {
        
    this.serie = {
        ...this.serie,
        ...super.setarMidia(values),
        direcao: values.direcao,
        elenco: values.elenco,
        nascionalidade: values.nascionalidade,
        duracao: values.duracao,
		numeroEpisodios: values.numeroEpisodios,
		numeroTemporadas: values.numeroTemporadas,
		faixaEtaria: values.faixaEtaria,
    }

        this.dadosIniciaisValidos = true;
        this.informacoesValidas = true;
        this.isEdicao = true;
  }
  
	onMidiaValido(value: Midia) {

		this.dadosIniciaisValidos = value !== undefined;

		if (value) {
			this.serie = {
				... this.serie,
				dataLancamento: value.dataLancamento,
				tipo: TipoMidia.SERIE,
				titulo: value.titulo,
				descricao: value.descricao,
				categorias: value.categorias,
			}
    }
	}

	onInformacoesValidas(value: FilmeSerie) {

		this.informacoesValidas = value !== undefined;

		if (value) {
			this.serie = {
				... this.serie,
				direcao: value.direcao,
				elenco: value.elenco,
				nascionalidade: value.nascionalidade,
				duracao: value.duracao,
				numeroEpisodios: value.numeroEpisodios,
				numeroTemporadas: value.numeroTemporadas,
				faixaEtaria: value.faixaEtaria
			}
		}
	}

	onImagemValida(value: File) {

		this.imagemCapaValida = value !== undefined;

		if (value) {
			this.serie = {
				... this.serie,
				arquivoImagem: value
			}
		}
	}

	onComplete() {
		this.blockUI.start();

		this.seriesService.salvar(this.serie).subscribe(result => {
			NotificationService.success(`Filme ${this.serie.titulo.toUpperCase()} salvo com sucesso.`);
			this.blockUI.stop();
			this.irParaListagem();
		}, error => {
			NotificationService.error(`Ocorreu uma falha ao tentar salvar o serie. ${error.error.message}`);
			this.blockUI.stop();
		});
	}

	irParaListagem() {
		this.router.navigateByUrl('midias/filmes');
	}

	onVoltar() {
		this.irParaListagem();
	}
}
