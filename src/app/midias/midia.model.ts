import { TipoMidia } from '../core/models/enums/tipo-midia.enum';
import { AbstractModel } from '../core/models/abstract.model';
import { Categoria } from '../core/models/categoria.model';

export class Midia extends AbstractModel {

    public dataLancamento: Date;

    public tipo: TipoMidia;

    public descricao: string;

    public urlCapa: string;

    public titulo: string;

    public categorias: Categoria[];

    public avaliacoes: Avaliacao[];

    public comentarios: Comentario[];

    public notaMidia: number;

}

export class Avaliacao extends AbstractModel {

    public userId: number;
    public userName: string;
    public nota: number;
    public idMidia: number;
    public tipoMidia: TipoMidia;

}

export class Comentario extends AbstractModel {

    public userId: number;
    public userName: string;
    public comentario: string;
    public idMidia: number;
    public tipoMidia: TipoMidia;

}
