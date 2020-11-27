import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FaixaEtaria } from 'src/app/midias/faixaEtaria.enum';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-informacoes-livro',
  templateUrl: './informacoes-livro.component.html',
  styleUrls: ['./informacoes-livro.component.css']
})
export class InformacoesLivroComponent implements OnInit {

	formGroup: FormGroup;

	faixaEtariaEnum = FaixaEtaria;

	@Output()
	valid: EventEmitter<Livro> = new EventEmitter<Livro>();

	_informacao: Livro;

	isDeveEditar = true;

	@Input()
	set informacoes(value: any) {
		this._informacao = this.convertParaInformacao(value);

		if (value && this.isDeveEditar) {
			this.patch();
		}
	}

	get inforacao(): Livro {

		return this._informacao;
	}

	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit(): void {

		this.createForm();
	}

	createForm() {
		
		this.formGroup = this._formBuilder.group({
			autor: ['', Validators.required],
			editora: ['', Validators.required],
			numeroPaginas: ['', Validators.required],
			peso: ['', Validators.required],
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

	setarValores(): Livro {

		const formValues = this.formGroup.value;

		const valores = {
			...new Livro(),
			autor: formValues.autor,
			editora: formValues.editora,
			numeroPaginas: formValues.numeroPaginas,
			peso: formValues.peso,
		}

		return valores;
	}

	private convertParaInformacao(value: any): Livro {

		const info = {
			...new Livro(),
			autor: value.autor,
			editora: value.editora,
			numeroPaginas: value.numeroPaginas,
			peso: value.peso,
		}

		return info;
	}

	private patch() {

		if (!this.formGroup) {
			return;
		}

		this.formGroup.patchValue({
			autor: this.inforacao.autor,
			editora: this.inforacao.editora,
			numeroPaginas: this.inforacao.numeroPaginas,
			peso: this.inforacao.peso,
		});

		this.isDeveEditar = false;
	}

}
