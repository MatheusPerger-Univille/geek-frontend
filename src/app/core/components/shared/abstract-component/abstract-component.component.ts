import { Component, OnInit } from '@angular/core';
import { Midia } from 'src/app/midias/midia.model';
import { TipoMidia } from 'src/app/core/models/enums/tipo-midia.enum';

@Component({
  selector: 'app-abstract-component',
  templateUrl: './abstract-component.component.html',
  styleUrls: ['./abstract-component.component.css']
})
export class AbstractComponentComponent implements OnInit {

    midia = new Midia();

    constructor(tipoMidia: TipoMidia) {
        this.midia.tipo = tipoMidia;
    }

    ngOnInit(): void {
    }

    setarMidia(values: any): Midia {
        
        this.midia = {
            ...new Midia(),
            id: values.id,
            dataLancamento: new Date(values.dataLancamento) || new Date(),
            tipo: values.tipo,
            descricao: values.descricao,
            urlCapa: values.urlCapa,
            titulo: values.titulo,
            categorias: values.categorias
        };

        return this.midia;
    }

}
