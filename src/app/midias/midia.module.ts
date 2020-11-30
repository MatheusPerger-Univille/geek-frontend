import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MidiasComponent } from './midias.component';
import { SharedModule } from '../core/components/shared/shared-module.module';

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
  {
    path: 'detalhamento',
    loadChildren: () => import('./detalhamento/detalhamento.module').then(m => m.DetalhamentoModule)
  }
  
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
