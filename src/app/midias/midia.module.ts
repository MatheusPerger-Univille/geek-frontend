import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MidiasComponent } from './midias.component';
import { SharedModule } from '../core/components/shared/shared-module.module';
import { LivrosComponent } from './livros/livros.component';
import { InformacoesLivroComponent } from './livros/livro/informacoes-livro/informacoes-livro.component';
import { LivroComponent } from './livros/livro/livro.component';
import { GamesComponent } from './games/games.component';

const ROUTES: Routes = [
  { path: '', component: MidiasComponent, pathMatch: 'full' },
  {
    path: 'filmes',
    loadChildren: () => import('./filmes/filmes.module').then(m => m.FilmesModule) 
  },
  {
    path: 'series',
    loadChildren: () => import('./series/series.module').then(m => m.SeriesModule)
  },
  {
    path: 'livros',
    loadChildren: () => import('./livros/livros.module').then(m => m.LivrosModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  
];

@NgModule({
  declarations: [
    MidiasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class MidiaModule { }
