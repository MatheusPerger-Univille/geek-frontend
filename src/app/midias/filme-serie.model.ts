import { Time } from '@angular/common';
import { Midia } from './midia.model';
import { FaixaEtaria } from './faixaEtaria.enum';

export class FilmeSerie extends Midia {

    public direcao: string;

    public elenco: string;

    public nascionalidade: string;

    public duracao: string;

    public faixaEtaria: FaixaEtaria;

}
