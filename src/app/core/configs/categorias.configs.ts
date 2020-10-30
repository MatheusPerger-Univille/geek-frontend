export class CategoriasModelo {

    public id: number;
    public descricao: string;
}

export class CategoriasConfig {

    static GAMES = [
        {id: 1, descricao: 'PS4'},
        {id: 2, descricao: 'XBOX ONE'},
        {id: 3, descricao: 'Nintendo switch'}
    ];

    static FILMES = [
        {id: 4, descricao: 'Aventura'},
        {id: 5, descricao: 'Ação'},
        {id: 6, descricao: 'Suspense'},
        {id: 7, descricao: 'Terror'},
        {id: 8, descricao: 'Drama'},
        {id: 9, descricao: 'Romance'}
    ];

    static SERIES = [
        {id: 4, descricao: 'Aventura'},
        {id: 5, descricao: 'Ação'},
        {id: 6, descricao: 'Suspense'},
        {id: 7, descricao: 'Terror'},
        {id: 8, descricao: 'Drama'},
        {id: 9, descricao: 'Romance'}
    ];

    static LIVROS = [
        {id: 10, descricao: 'Computação'},
        {id: 11, descricao: 'Fantasia'},
        {id: 12, descricao: 'Horror'},
        {id: 13, descricao: 'Ficção'},
        {id: 9, descricao: 'Romance'},
        {id: 6, descricao: 'Suspense'}
    ];

};
