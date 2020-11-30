import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { Avaliacao } from '../midia.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

	protected API_PATH = API_CONFIG.baseUrl + '/api/avaliacoes';

	constructor(protected httpClient: HttpClient) {
	}

	salvar(value: Avaliacao): Observable<any> {

		if (value.id) {
		  return this.httpClient.put<number>(`${this.API_PATH}`, value);
		}
		return this.httpClient.post<number>(`${this.API_PATH}`, value);
	}
	
	excluir(value: number): Observable<any> {
	
		return this.httpClient.delete(`${this.API_PATH}/${value}`);
	}
}
