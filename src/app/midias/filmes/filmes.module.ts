import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilmesComponent } from './filmes.component';
import { FilmeComponent } from './filme/filme.component';
import { SharedModule } from 'src/app/core/components/shared/shared-module.module';
import { InformacoesFilmeComponent } from './filme/informacoes-filme/informacoes-filme.component';

const ROUTES: Routes = [
  { path: '', component: FilmesComponent, pathMatch: 'full' },
  { path: 'criar', component: FilmeComponent },
  { path: 'editar/:id', component: FilmeComponent },
];

@NgModule({
  declarations: [
    FilmesComponent,
    FilmeComponent,
    InformacoesFilmeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class FilmesModule { }
