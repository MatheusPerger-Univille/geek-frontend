import { Sort } from './sort.model';

export class EntityBase<T> {

    constructor(
        public content: T[],
        public first: boolean,
        public last: boolean,
        public number: number,
        public numberOfElements: number,
        public size: number,
        public sort: Sort[],
        public totalElements: number,
        public totalPages: number) {

    }
}