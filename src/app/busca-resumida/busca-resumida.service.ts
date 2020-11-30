import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../core/configs/api.config';
import { TipoMidia } from '../core/models/enums/tipo-midia.enum';
import { FilterUtils } from '../core/utils/filter-utils';
import { BuscaResumida } from './busca-resumida.model';

@Injectable({
  providedIn: 'root'
})
export class BuscaResumidaService {

	protected API_PATH = API_CONFIG.baseUrl + '/api/busca-resumida';

	constructor(protected httpClient: HttpClient) {
	}

	filtrar(termo?: string, tipoMidia?: TipoMidia, categoria?: number): Observable<BuscaResumida> {

		const filtro = {
			termo: termo ? termo : '',
			tipoMidia: tipoMidia,
			categoria: categoria
		}

		const filterStr = FilterUtils.convertToString(filtro);
	
		return this.httpClient.get<BuscaResumida>(`${this.API_PATH}?filtro=${filterStr}`)
	}
}
