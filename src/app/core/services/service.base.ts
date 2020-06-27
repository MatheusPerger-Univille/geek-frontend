import { HttpClient } from '@angular/common/http';

import { Observable, of as observableOf } from 'rxjs';

import { Paging } from '../models/paging.model';
import { EntityBase } from '../models/entity-base.model';


export abstract class ServiceBase<T> {

    protected abstract readonly API_PATH: string;

    constructor(protected httpClient: HttpClient) { }

    paginacaoDefault(): Paging {
        return new Paging();
    }

    obterPorId(id: number): Observable<T> {

        return this.httpClient.get<T>(`${this.API_PATH}/${id}`);
    }

}
