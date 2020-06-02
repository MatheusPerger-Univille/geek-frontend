export class DataUtils {

    static conveterString(data: Date): string {
        return data.toISOString();
    }

    static addMeses(quantidade: number, em: Date = new Date()): Date {

        // Acresenta meses à data atual, sendo que, se o dia não existir no mes alvo, coloca o último dia possível para o mes.
        const mes = new Date(em).getMonth() + quantidade;
        const dataAlvo = new Date(new Date(new Date(em).setDate(1)).setMonth(new Date(em).getMonth() + quantidade));
        let data = new Date(new Date(em).setMonth(new Date(em).getMonth() + quantidade));

        // Coloca 0 no dia para setar o último dia do mes. Aqui também volta um mes.
        if (data.getMonth() !== dataAlvo.getMonth()) {
            data = new Date(data.setDate(0));
        }

        return data;
    }

    static addDias(quantidade: number, em: Date = new Date()) {

        return new Date(new Date(em).setDate(new Date(em).getDate() + quantidade));
    }

    /**
     * Compara duas datas, retornando: 0 se forem iguais, -1 se d1 for menor que d2 e 1 se  d1 for maior que d2.
     * @param d1 Data base
     * @param d2 Data para comparar
     */
    static compare(d1: Date, d2: Date): number {

        const calc = d1.getTime() - d2.getTime();

        return calc === 0 ? 0 : calc > 0 ? 1 : -1;
    }

    static get dataInicialMesAtual(): Date {

        return new Date(new Date().setDate(1));
    }

    static get dataFinalMesAtual(): Date {

        let data = new Date();
        data = new Date(data.getFullYear(), data.getMonth() + 1, 0);

        return data;
    }

    static get primeiroDiaAnoAtual(): Date {

        return new Date(new Date(new Date().setDate(1)).setMonth(0));
    }

    /**
     * Retorna de forma númerica a quantidade de dias corridos desde a data informada até a data atual
     * @param data Data usada para calcular
     * @returns Quantidade de dias até a data informada
     */
    static calcularDiasAteHoje(data): number {
        const diferencaTempo = new Date(Date.now()).getTime() - new Date(data).getTime();
        const diferencaDias: number = Math.ceil(diferencaTempo / (1000 * 3600 * 24)) - 1;
        return diferencaDias;
    }


    /**
     * Obtém o período, utilizando o mês atual - 30 dias.
     * @returns Array contendo data inicial e data final.
     */
    static get periodoUltimoMes(): Date[] {

        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 30);

        return [
            dataInicial,
            new Date(),
        ];
    }

    /**
     * Recebe uma data, diminui um ano (deixando no ano passado) e retorna um novo objeto.
     * @param data
     */
    static decrementarUmAno(data: Date = new Date()): Date {

        const d = new Date(data.getFullYear() - 1, data.getMonth(), data.getDate());
        return d;
    }

}
