import { AbstractModel } from './abstract.model';

export class UserLogado extends AbstractModel {

    public nome: string;
    public email: string;
    public admin: boolean;
    public redator: boolean;
    public usuario: boolean;

}