import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Midia } from '../midia.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoriasModelo, CategoriasConfig } from 'src/app/core/configs/categorias.configs';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';

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

	get listCategorias(): CategoriasModelo[] {

		if (!this.midia) {
			return;
		}

		switch(this.midia.tipo) {
			
			case TipoMidia.FILME:
				return CategoriasConfig.FILMES;
			
			case TipoMidia.SERIE:
				return CategoriasConfig.SERIES;

			case TipoMidia.LIVRO:
				return CategoriasConfig.LIVROS;
			
			case TipoMidia.GAME:
				return CategoriasConfig.GAMES;
				
			default:
				break;
		}
	}

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

	private createForm() {

		this.formGroup = this._formBuilder.group({
			titulo: ['', Validators.required],
			dataLancamento: [new Date(), Validators.required],
			descricao: ['', Validators.required],
			categorias: ['', Validators.required]
		});

		this.formGroup.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged()
		).subscribe(f => this.validarEmitir());
		
	}

	private validarEmitir() {

		if (this.formGroup.valid) {
			const valores = this.setarValores();
			this.valid.emit(valores);
		} else {
			this.valid.emit();
		}
	}

	private setarValores(): Midia {

		const formValues = this.formGroup.getRawValue();

		const midia = {
			...new Midia(),
			id: formValues.id,
			titulo: formValues.titulo,
			descricao: formValues.descricao,
			dataLancamento: formValues.dataLancamento,
			categorias: formValues.categorias
		}

		return midia;
    }
    
    private patch() {

		if (!this.formGroup) {
			return;
		}

        this.formGroup.patchValue({
            titulo: this.midia.titulo,
            dataLancamento: new Date(this.midia.dataLancamento),
            descricao: this.midia.descricao,
            categorias: this.midia.categorias
		});
		
		this.isDeveEditar = false;
    }

}
