import { Sort } from '../models/sort.model';
import { Paging } from '../models/paging.model';


export class PagingService {

    build(data: any, columns: any[]): Paging {

        const p = new Paging();

        if (data.start) {
            p.start = data.start;
        }

        if (data.order) {
            data.order.forEach(o => {
                const objC = columns[o.column];
                const dir = o.dir;

                if (objC.ordenacao && objC.ordenacao.length > 0) {

                    objC.ordenacao.forEach(c => {
                        p.sort.push(new Sort(c, dir));
                    });

                } else {
                    const prop = objC.data;

                    if (prop && dir) {
                        p.sort.push(new Sort(prop, dir));
                    }
                }
            });
        }

        if (data.length) {
            p.size = data.length;
        }

        p.search = data.search.value;

        return p;

    }

}
