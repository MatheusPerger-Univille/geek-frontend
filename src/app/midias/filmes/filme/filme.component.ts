import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Midia } from '../../midia.model';
import { Filme } from '../filme.model';
import { FilmeSerie } from '../../filme-serie.model';
import { FilmesService } from '../filmes.service';
import { NotificationService } from 'src/app/core/components/shared/notification/notification.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';
import { FaixaEtaria } from '../../faixaEtaria.enum';
import { AbstractComponentComponent } from 'src/app/core/components/shared/abstract-component/abstract-component.component';

@Component({
	selector: 'app-filme',
	templateUrl: './filme.component.html',
	styleUrls: ['./filme.component.css']
})
export class FilmeComponent extends AbstractComponentComponent implements OnInit {

	@BlockUI() 
	blockUI: NgBlockUI;

	formGroup: FormGroup;

	dadosIniciaisValidos = false;
	
	informacoesValidas = false;

	imagemCapaValida = false;

	filme = new Filme();
	
	isEdicao = false;

	filmeTesteEdicao = {... new Filme(),
		id: 1,
		dataLancamento: new Date(),
		tipo: TipoMidia.FILME,
		descricao: 'Velozes é muito bom...',
		urlCapa: 'https://curso-spring-matheusp.s3-sa-east-1.amazonaws.com/GeekReviews.png',
		titulo: 'Velozes e Furiosos 8',
		direcao: 'Alguem',
		elenco: 'Vin Diesel',
		nascionalidade: 'EUA',
		duracao: '2h 36m',
		faixaEtaria: FaixaEtaria.QUATORZE,
	};

	constructor(private router: Router,
		private route: ActivatedRoute,
		private filmesService: FilmesService
	) { 
        super();
    }

	ngOnInit(): void {

		const id = +this.route.snapshot.paramMap.get("id");

		if (id) {
			this.carregarValoresEdicao(id);
		}
		
	}

	private carregarValoresEdicao(id: number) {

		this.filmesService.obterPorId(id).subscribe(result => {
			this.setarValoresEdicao(result);
		}, error => {
			NotificationService.error(`Ocorreu um erro ao recuperar o filme.`);
            // this.irParaListagem();
            this.setarValoresEdicao(this.filmeTesteEdicao); // RETIRAR APÓS IMPLEMENTAR BACKEND
		});
	}

	private setarValoresEdicao(values: Filme) {
        
        this.filme = {
            ...this.filme,
            ...super.setarMidia(values),
            direcao: values.direcao,
            elenco: values.elenco,
            nascionalidade: values.nascionalidade,
            duracao: values.duracao,
            faixaEtaria: values.faixaEtaria,
        }

        this.dadosIniciaisValidos = true;
		this.informacoesValidas = true;
		this.isEdicao = true;
	}

	onMidiaValido(value: Midia) {

		this.dadosIniciaisValidos = value !== undefined;

		if (value) {
			this.filme = {
				... this.filme,
				dataLancamento: value.dataLancamento,
				tipo: TipoMidia.FILME,
				titulo: value.titulo,
				descricao: value.descricao
			}
		}
	}

	onInformacoesValidas(value: FilmeSerie) {

		this.informacoesValidas = value !== undefined;

		if (value) {
			this.filme = {
				... this.filme,
				direcao: value.direcao,
				elenco: value.elenco,
				nascionalidade: value.nascionalidade,
				duracao: value.duracao,
				faixaEtaria: value.faixaEtaria
			}
		}
	}

	onImagemValida(value: File) {

		this.imagemCapaValida = value !== undefined;

		if (value) {
			this.filme = {
				... this.filme,
				arquivoImagem: value
			}
		}
	}

	onComplete() {
		console.log('finalizado');
		console.log(this.filme);
		this.blockUI.start();

		this.filmesService.salvar(this.filme).subscribe(result => {
			NotificationService.success(`Filme ${this.filme.titulo.toUpperCase} salvo com sucesso.`);
			this.blockUI.stop();
			this.irParaListagem();
		}, error => {
			NotificationService.error(`Ocorreu uma falha ao tentar salvar o filme. ${error.message}`);
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
