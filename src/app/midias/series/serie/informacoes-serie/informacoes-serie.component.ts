import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FaixaEtaria } from 'src/app/midias/faixaEtaria.enum';
import { FilmeSerie } from 'src/app/midias/filme-serie.model';

@Component({
    selector: 'app-informacoes-serie',
    templateUrl: './informacoes-serie.component.html',
    styleUrls: ['./informacoes-serie.component.css']
  })

  export class InformacoesSerieComponent implements OnInit {
    
    formGroup: FormGroup;
	faixaEtariaEnum = FaixaEtaria;


	@Output()
	valid: EventEmitter<FilmeSerie> = new EventEmitter<FilmeSerie>();

	_informacao: FilmeSerie;

	isDeveEditar = true;

    @Input()
	set informacoes(value: any) {
		this._informacao = this.convertParaInformacao(value);

		if (value && this.isDeveEditar) {
			this.patch();
        }
    }

	get inforacao(): FilmeSerie {

		return this._informacao;
	}

    constructor(private _formBuilder: FormBuilder) { }

	ngOnInit(): void {

		this.createForm();
    }

	createForm() {
		
		this.formGroup = this._formBuilder.group({
			direcao: ['', Validators.required],
			elenco: ['', Validators.required],
			nascionalidade: ['', Validators.required],
			duracao: ['', Validators.required],
			numeroEpisodios: ['', Validators.required],
			numeroTemporadas: ['', Validators.required],
			faixaEtaria: ['', Validators.required],
		});

		this.formGroup.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
            ).subscribe(f => this.validarEmitir());
        }

	validarEmitir() {

		if (this.formGroup.valid) {
			const valores = this.setarValores();
			this.valid.emit(valores);
		} else {
			this.valid.emit();
		}
    }
    
	setarValores(): FilmeSerie {

		const formValues = this.formGroup.value;

		const valores = {
			...new FilmeSerie(),
			direcao: formValues.direcao,
			elenco: formValues.elenco,
			nascionalidade: formValues.nascionalidade,
			duracao: formValues.duracao,
			numeroEpisodios: formValues.numeroEpisodios,
			numeroTemporadas: formValues.numeroTemporadas,
			faixaEtaria: formValues.faixaEtaria
		}

		return valores;
    }
    
	private convertParaInformacao(value: any): FilmeSerie {

		const info = {
			...new FilmeSerie(),
			direcao: value.direcao,
			elenco: value.elenco,
			nascionalidade: value.nascionalidade,
			duracao: value.duracao,
			numeroEpisodios: value.numeroEpisodios,
			numeroTemporadas: value.numeroTemporadas,
			faixaEtaria: value.faixaEtaria
		}

		return info;
    }
    
	private patch() {

		if (!this.formGroup) {
			return;
		}

		this.formGroup.patchValue({
			direcao: this.inforacao.direcao,
			elenco: this.inforacao.elenco,
			nascionalidade: this.inforacao.nascionalidade,
			duracao: this.inforacao.duracao,
			numeroEpisodios: this.inforacao.numeroEpisodios,
			numeroTemporadas: this.inforacao.numeroTemporadas,
			faixaEtaria: this.inforacao.faixaEtaria,
		});

		this.isDeveEditar = false;
	}

}