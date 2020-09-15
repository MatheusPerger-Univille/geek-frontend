import { TipoMidia } from '../core/models/enums/tipo-midia.enum';
import { AbstractModel } from '../core/models/abstract.model';
import { Categoria } from '../core/models/categoria.model';

export class Midia extends AbstractModel {

    public dataLancamento: Date;

    public tipo: TipoMidia;

    public descricao: string;

    public urlCapa: string;

    public arquivoImagem: File;

    public titulo: string;

    public categorias: Categoria[];

}
