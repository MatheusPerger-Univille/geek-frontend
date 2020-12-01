import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MidiasComponent } from './midias.component';
import { SharedModule } from '../core/components/shared/shared-module.module';
import { AuthGuard } from '../core/guard/auth.guard';

const ROUTES: Routes = [
  { path: '', component: MidiasComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'filmes',
    loadChildren: () => import('./filmes/filmes.module').then(m => m.FilmesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'series',
    loadChildren: () => import('./series/series.module').then(m => m.SeriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'livros',
    loadChildren: () => import('./livros/livros.module').then(m => m.LivrosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule),
    canActivate: [AuthGuard]
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
