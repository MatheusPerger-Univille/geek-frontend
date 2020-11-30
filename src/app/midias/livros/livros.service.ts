import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { Paging } from 'src/app/core/models/paging.model';
import { ServiceBase } from 'src/app/core/services/service.base';
import { Livro } from './livro/livro.model';
import { LivrosPesquisa } from './livros-pesquisa.model';


@Injectable({
    providedIn: 'root'
  })

export class LivrosService extends ServiceBase<Livro> {

    protected API_PATH = API_CONFIG.baseUrl + '/api/livros';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    filtrar(paginacao?: Paging): Observable<EntityBase<LivrosPesquisa>> {

        if (!paginacao) {
            paginacao = new Paging();
        }

        return this.httpClient.get<EntityBase<LivrosPesquisa>>(`${this.API_PATH}/filtrar?search=${paginacao.search}&${paginacao.toString()}`)
    }

    salvar(value: Livro): Observable<number> {

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