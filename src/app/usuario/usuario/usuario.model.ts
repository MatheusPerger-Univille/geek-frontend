import { AbstractModel } from 'src/app/core/models/abstract.model';
import { Permissao } from 'src/app/core/models/enums/permissao.enum';

export class Usuario extends AbstractModel {
    
    public nome: string;
    public email: string;
    public senha: string;
    public apelido: string;
    public uf: string;
    public cidade: string;
    public permissao: Permissao;

}