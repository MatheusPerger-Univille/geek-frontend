import { AbstractModel } from 'src/app/core/models/abstract.model';
import { Permissao } from 'src/app/core/models/enums/permissao.enum';

export class UsuarioPesquisa extends AbstractModel {

    public nome: string;
    public permissao: Permissao;
    public permissaoDesc: string;

}