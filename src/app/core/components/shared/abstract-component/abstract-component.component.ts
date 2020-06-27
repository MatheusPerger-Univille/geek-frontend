import { Component, OnInit } from '@angular/core';
import { Midia } from 'src/app/midias/midia.model';

@Component({
  selector: 'app-abstract-component',
  templateUrl: './abstract-component.component.html',
  styleUrls: ['./abstract-component.component.css']
})
export class AbstractComponentComponent implements OnInit {

    midia: Midia;

    constructor() { }

    ngOnInit(): void {
    }

    setarMidia(values: any): Midia {
        
        this.midia = {
            ...new Midia(),
            id: values.id,
            dataLancamento: values.dataLancamento,
            tipo: values.tipo,
            descricao: values.descricao,
            urlCapa: values.urlCapa,
            titulo: values.titulo,
        };

        return this.midia;
    }

}
