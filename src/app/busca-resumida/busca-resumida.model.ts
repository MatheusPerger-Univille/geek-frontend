import { AbstractModel } from '../core/models/abstract.model';

export class BuscaResumida {

    public filmes: BuscaResumidaMidia[];
    public series: BuscaResumidaMidia[];
    public livros: BuscaResumidaMidia[];
    public games: BuscaResumidaMidia[];

}

export class BuscaResumidaMidia extends AbstractModel {

    public urlImagem: string;
    public titulo: string;
    public responsavel: string;

}