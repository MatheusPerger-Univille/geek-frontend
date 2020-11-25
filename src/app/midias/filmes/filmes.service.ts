import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/core/services/service.base';
import { HttpClient } from '@angular/common/http';
import { Filme } from './filme.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { Paging } from 'src/app/core/models/paging.model';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { FilterUtils } from 'src/app/core/utils/filter-utils';
import { FilmesPesquisa } from './filmes-pesquisa.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService extends ServiceBase<Filme> {

  protected API_PATH = API_CONFIG.baseUrl + '/api/filmes';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  filtrar(paginacao?: Paging): Observable<EntityBase<FilmesPesquisa>> {

    if (!paginacao) {
      paginacao = new Paging();
    }

    return this.httpClient.get<EntityBase<FilmesPesquisa>>(`${this.API_PATH}/filtrar?search=${paginacao.search}&${paginacao.toString()}`)
  }

  salvar(value: Filme): Observable<number> {

    if (value.id) {
      return this.httpClient.put<number>(`${this.API_PATH}`, value);
    }
    return this.httpClient.post<number>(`${this.API_PATH}`, value);
  }

  excluir(value: number): Observable<any> {
    
    return this.httpClient.delete(`${this.API_PATH}/${value}`);
  }

  uploadImagem(form: FormData, idFilme: number): Observable<any> {

    return this.httpClient.put(`${this.API_PATH}/upload/${idFilme}`, form);
  }
}
