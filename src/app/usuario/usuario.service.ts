import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../core/configs/api.config';
import { EntityBase } from '../core/models/entity-base.model';
import { Paging } from '../core/models/paging.model';
import { ServiceBase } from '../core/services/service.base';
import { Usuario } from './usuario/usuario.model';
import { UsuarioPesquisa } from './usuarios/usuario-pesquisa.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

	protected API_PATH = API_CONFIG.baseUrl + '/api/usuarios';

	constructor(protected httpClient: HttpClient) {
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

	obterUsuarioPorEmail(email: string): Observable<Usuario> {
		
		return this.httpClient.get<Usuario>(`${this.API_PATH}/email?value=${email}`)
	}
}
