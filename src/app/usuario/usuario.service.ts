import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/components/shared/login/auth.service';
import { NotificationService } from '../core/components/shared/notification/notification.service';
import { API_CONFIG } from '../core/configs/api.config';
import { EntityBase } from '../core/models/entity-base.model';
import { Paging } from '../core/models/paging.model';
import { UserLogado } from '../core/models/user-logado.model';
import { ServiceBase } from '../core/services/service.base';
import { StorageService } from '../core/services/storage.service';
import { Usuario } from './usuario/usuario.model';
import { UsuarioPesquisa } from './usuarios/usuario-pesquisa.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

	usuarioLogado: UserLogado;

	get isAdmin(): boolean {
		console
		return this.usuarioLogado?.admin;
	}

	get isRedator(): boolean {
		return this.usuarioLogado?.redator;
	}

	get isUsuario(): boolean {
		return this.usuarioLogado?.usuario;
	}

	protected API_PATH = API_CONFIG.baseUrl + '/api/usuarios';

	constructor(protected httpClient: HttpClient, private storage: StorageService) {
		super(httpClient);
	}

	filtrar(paginacao?: Paging): Observable<EntityBase<UsuarioPesquisa>> {

		if (!paginacao) {
		  paginacao = new Paging();
		}
	
		return this.httpClient.get<EntityBase<UsuarioPesquisa>>(`${this.API_PATH}/filtrar?search=${paginacao.search}&${paginacao.toString()}`)
	}
	
	excluir(value: number): Observable<any> {
		return this.httpClient.delete(`${this.API_PATH}/${value}`);
	}
		
	salvar(value: Usuario): Observable<any> {
	
		if (value.id) {
		  return this.httpClient.put(`${this.API_PATH}`, value);
		}
		return this.httpClient.post(`${this.API_PATH}`, value);
	}

	obterUsuarioPorEmail(email: string): Observable<UserLogado> {
		
		return this.httpClient.get<UserLogado>(`${this.API_PATH}/email?value=${email}`)
	}

	obterUsuarioLogado() {

		if (this.usuarioLogado) {
			return this.usuarioLogado
		} else {

			const user = this.storage.getLocalUser();
			if (user) {
				this.obterUsuarioPorEmail(user.email).subscribe(v => {
						this.usuarioLogado = v;
						return this.usuarioLogado;
					}, error => {
						NotificationService.error(error.error.message);
						return undefined;
					}
				)
			} else {
				return undefined;
			}

		}
	}
	
}
