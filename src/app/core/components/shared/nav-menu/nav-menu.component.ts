import { Component, OnInit } from '@angular/core';
import { CategoriasConfig } from 'src/app/core/configs/categorias.configs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

	listCategoriasFilmes = CategoriasConfig.FILMES;

	listCategoriasSeries = CategoriasConfig.SERIES;

	listCategoriasGames  = CategoriasConfig.GAMES;

	listCategoriasLivros = CategoriasConfig.LIVROS;

    constructor() {
	}

    ngOnInit(): void {
	}

}
