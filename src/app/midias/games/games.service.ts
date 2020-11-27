import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/configs/api.config';
import { EntityBase } from 'src/app/core/models/entity-base.model';
import { Paging } from 'src/app/core/models/paging.model';
import { ServiceBase } from 'src/app/core/services/service.base';
import { Game } from './game/game.model';
import { GamesPesquisa } from './games-pesquisa.model';


@Injectable({
    providedIn: 'root'
  })

export class GamesService extends ServiceBase<Game> {

    protected API_PATH = API_CONFIG.baseUrl + '/api/games';


    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    filtrar(paginacao?: Paging): Observable<EntityBase<GamesPesquisa>> {

        if (!paginacao) {
        paginacao = new Paging();
        }

        return this.httpClient.get<EntityBase<GamesPesquisa>>(`${this.API_PATH}/filtrar?search=${paginacao.search}&${paginacao.toString()}`)
    }

    salvar(value: Game): Observable<any> {

        if (value.id) {
        return this.httpClient.put(`${this.API_PATH}`, value);
        }
        return this.httpClient.post(`${this.API_PATH}`, value);
    }


    excluir(value: number): Observable<any> {
        
        return this.httpClient.delete(`${this.API_PATH}/${value}`);
    }
}