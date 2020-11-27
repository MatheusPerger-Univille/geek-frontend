import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Game } from '../game.model';

@Component({
  selector: 'app-informacoes-game',
  templateUrl: './informacoes-game.component.html',
  styleUrls: ['./informacoes-game.component.css']
})
export class InformacoesGameComponent implements OnInit {

	formGroup: FormGroup;


	@Output()
	valid: EventEmitter<Game> = new EventEmitter<Game>();

	_informacao: Game;

	isDeveEditar = true;

	@Input()
	set informacoes(value: any) {
		this._informacao = this.convertParaInformacao(value);

		if (value && this.isDeveEditar) {
			this.patch();
		}
	}

	get inforacao(): Game {

		return this._informacao;
	}

	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit(): void {

		this.createForm();
	}

	createForm() {
		
		this.formGroup = this._formBuilder.group({
			desenvolvedora: ['', Validators.required],
			opcaoOnline: ['', Validators.required],
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

	setarValores(): Game {

		const formValues = this.formGroup.value;

		const valores = {
			...new Game(),
			desenvolvedora: formValues.desenvolvedora,
			opcaoOnline: formValues.opcaoOnline,
		}

		return valores;
	}

	private convertParaInformacao(value: any): Game {

		const info = {
			...new Game(),
			desenvolvedora: value.desenvolvedora,
			opcaoOnline: value.opcaoOnline,
		}

		return info;
	}

	private patch() {

		if (!this.formGroup) {
			return;
		}

		this.formGroup.patchValue({
			desenvolvedora: this.inforacao.desenvolvedora,
			opcaoOnline: this.inforacao.opcaoOnline,
		});

		this.isDeveEditar = false;
	}

}
