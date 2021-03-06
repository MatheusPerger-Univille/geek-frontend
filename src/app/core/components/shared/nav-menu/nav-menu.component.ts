import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private router: Router) {
	}

    ngOnInit(): void {
	}

	onPesquisaMidia(termo: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => 
			this.router.navigate(['pesquisa', termo]));
	}

	onPesquisaCategoria(tipo: string, idCategoria: number) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => 
			this.router.navigate(['pesquisa', tipo, idCategoria]));
	}

}
