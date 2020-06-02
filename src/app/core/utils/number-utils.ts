export class NumberUtils {

    /**
     * Calcula a média dos valores.
     * @param values Valores para calcular média.
     * @param precision Casas decimais. Se não informado, será utilizado 2 casas por padrão.
     */
    static avg(values: number[], precision = 2): number {

        const sum = values.reduce((a, b) => a + b);
        return parseFloat((sum / values.length).toFixed(precision));
    }

    static onlyNumbers(value: string): number {

        if (!value || value === null) { return undefined; }

        const val = value.replace(/\D/g, '');
        return val && val.length > 0 ? +val : undefined;
    }

}
