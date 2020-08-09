export class CategoriasModelo {

    public value: number;
    public descricao: string;
}

export class CategoriasConfig {

    static GAMES = [
        {value: 1, descricao: 'PS4'},
        {value: 2, descricao: 'XBOX ONE'},
        {value: 3, descricao: 'Nintendo switch'}
    ];

    static FILMES = [
        {value: 4, descricao: 'Aventura'},
        {value: 5, descricao: 'Ação'},
        {value: 6, descricao: 'Suspense'},
        {value: 7, descricao: 'Terror'},
        {value: 8, descricao: 'Drama'},
        {value: 9, descricao: 'Romance'}
    ];

    static SERIES = [
        {value: 4, descricao: 'Aventura'},
        {value: 5, descricao: 'Ação'},
        {value: 6, descricao: 'Suspense'},
        {value: 7, descricao: 'Terror'},
        {value: 8, descricao: 'Drama'},
        {value: 9, descricao: 'Romance'}
    ];

    static LIVROS = [
        {value: 10, descricao: 'Computação'},
        {value: 11, descricao: 'Fantasia'},
        {value: 12, descricao: 'Horror'},
        {value: 13, descricao: 'Ficção'},
        {value: 9, descricao: 'Romance'},
        {value: 6, descricao: 'Suspense'}
    ];

};
