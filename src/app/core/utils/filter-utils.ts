import { DataUtils } from './data-utils';

export abstract class FilterUtils {

    /**
     * Transforma todos os campos de uma classe para o formato &key=value.
     * Esta string pode ser utilizada principalmente em requisições get.
     * Neste caso, os nomes e tipos dos atributos do model e DTO (projeto server) devem ser iguais.
     *
     * @param filters Object de filtros. Deve ser uma instância de classe de filtros.
     */
    static convertToString(filters: any, prefix = ''): string {

        const keys = Object.keys(filters);

        if (!keys || !keys.length) {
            return '';
        }

        const url = keys.map(field => {
            const val = filters[field];
            const type = ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            let valStr = '';
            let ignorar = false;
            let isObj = false;

            switch (type) {
                case 'string':
                    valStr = val;
                    break;

                case 'boolean':
                    valStr = val;
                    break;

                case 'date':
                    valStr = DataUtils.conveterString(val);
                    break;

                case 'number':
                    valStr = val;
                    break;

                case 'object':
                    valStr = this.convertToString(filters[field], field);
                    isObj = true;
                    break;

                case 'array':
                    valStr = val.join(',');

                    if (!valStr) {
                        ignorar = true;
                    }
                    break;

                default:
                    ignorar = true;
                    // tslint:disable-next-line:max-line-length
                    console.warn(`[filter-utils] O tipo "${type}" do atributo "${field}" não é suportado. Seu key-value não será adicionado na string de retorno. Implemente o tipo "${type}" para tratar este problema.`);
                    break;

            }

            if (ignorar) { return ''; }

            if (isObj) { return valStr; }

            return `&${prefix ? prefix + '.' : ''}${field}=${valStr}`;

        }).reduce((a, b) => a.concat(b));

        return encodeURI(url);
    }

}
