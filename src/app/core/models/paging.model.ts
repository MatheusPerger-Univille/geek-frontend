import { Sort } from './sort.model';

export class Paging {

    private _page = 0;

    get page(): number {

        if (this.start) {
            this._page = this.start / this.size;
        }

        return this._page;
    }

    set page(page: number) {
        this._page = page;
    }

    public size = 20;

    public start?: number;

    public sort: Sort[] = [];

    public search: string;

    toString() {

        let sortStr = '';

        if (this.sort.length) {

            this.sort.forEach((s: Sort) => {

                if (s.property && s.direction) {
                    sortStr += `&sort=${s.property},${s.direction}`;
                }

            });
        }

        return `size=${this.size}&page=${this.page}${sortStr}`;
    }
}
