import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LivrosComponent } from './livros.component';
import { LivroComponent } from './livro/livro.component';
import { InformacoesLivroComponent } from './livro/informacoes-livro/informacoes-livro.component';
import { SharedModule } from 'src/app/core/components/shared/shared-module.module';

const ROUTES: Routes = [
  { path: '', component: LivrosComponent, pathMatch: 'full' },
  { path: 'criar', component: LivroComponent },
  { path: 'editar/:id', component: LivroComponent },
];

@NgModule({
  declarations: [
    LivrosComponent,
    LivroComponent,
    InformacoesLivroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class LivrosModule { }
