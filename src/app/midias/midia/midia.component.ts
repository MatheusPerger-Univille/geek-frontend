import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Midia } from '../midia.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-midia',
	templateUrl: './midia.component.html',
	styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {

	formGroup: FormGroup;

	_midia: Midia;

	@Output()
	valid: EventEmitter<Midia> = new EventEmitter<Midia>();

	isDeveEditar = true;

	@Input()
	set midia(value: Midia) {
		this._midia = value;

        if (value && this.isDeveEditar) {
			this.patch();
		}
	}

	get midia(): Midia {
		return this._midia;
    }
    
    get isEdicao(): boolean {
        return this.midia && this.midia.id !== undefined;
    }

	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit(): void {

		this.createForm();
		
	}

	createForm() {

		this.formGroup = this._formBuilder.group({
			titulo: ['', Validators.required],
			dataLancamento: [new Date(), Validators.required],
			descricao: ['', Validators.required]
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

	setarValores(): Midia {

		const formValues = this.formGroup.value;

		const midia = {
			...new Midia(),
			id: formValues.id,
			titulo: formValues.titulo,
			descricao: formValues.descricao,
			dataLancamento: formValues.dataLancamento
		}

		return midia;
    }
    
    patch() {

		if (!this.formGroup) {
			return;
		}

        this.formGroup.patchValue({
            titulo: this.midia.titulo,
            dataLancamento: new Date(this.midia.titulo),
            descricao: this.midia.descricao,
		});
		
		this.isDeveEditar = false;
    }

}