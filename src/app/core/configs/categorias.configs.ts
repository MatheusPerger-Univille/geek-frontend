export class CategoriasModelo {

    public value: string;
    public descricao: string;
}

export class CategoriasConfig {

    static GAMES = [
        {value: 'ps4', descricao: 'PS4'},
        {value: 'xbox-one', descricao: 'XBOX ONE'},
        {value: 'switch', descricao: 'Nintendo switch'}
    ];

    static FILMES = [
        {value: 'aventura', descricao: 'Aventura'},
        {value: 'acao', descricao: 'Ação'},
        {value: 'suspense', descricao: 'Suspense'},
        {value: 'terror', descricao: 'Terror'},
        {value: 'drama', descricao: 'Drama'},
        {value: 'romance', descricao: 'Romance'}
    ];

    static SERIES = [
        {value: 'aventura', descricao: 'Aventura'},
        {value: 'acao', descricao: 'Ação'},
        {value: 'suspense', descricao: 'Suspense'},
        {value: 'terror', descricao: 'Terror'},
        {value: 'drama', descricao: 'Drama'},
        {value: 'romance', descricao: 'Romance'}
    ];

    static LIVROS = [
        {value: 'computacao', descricao: 'Computação'},
        {value: 'fantasia', descricao: 'Fantasia'},
        {value: 'horror', descricao: 'Horror'},
        {value: 'ficcao', descricao: 'Ficção'},
        {value: 'romance', descricao: 'Romance'},
        {value: 'suspense', descricao: 'Suspense'}
    ];

};
