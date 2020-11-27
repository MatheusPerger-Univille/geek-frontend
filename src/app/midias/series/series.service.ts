import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { Paging } from 'src/app/core/models/paging.model';
import { ServiceBase } from 'src/app/core/services/service.base';
import { Serie } from './serie/serie.model';
import { SeriesPesquisa } from './series/series-pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends ServiceBase<Serie> {

  protected API_PATH = API_CONFIG.baseUrl + '/api/series'; // sempre plural

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  filtrar(paginacao?: Paging): Observable<EntityBase<SeriesPesquisa>> {

    if (!paginacao) {
      paginacao = new Paging();
    }

    return this.httpClient.get<EntityBase<SeriesPesquisa>>(`${this.API_PATH}/filtrar?search=${paginacao.search}&${paginacao.toString()}`)
  }

  excluir(value: number): Observable<any> {
    return this.httpClient.delete(`${this.API_PATH}/${value}`);
  }
    
  salvar(value: Serie): Observable<any> {

    if (value.id) {
      return this.httpClient.put(`${this.API_PATH}`, value);
    }
    return this.httpClient.post(`${this.API_PATH}`, value);
  }


}
