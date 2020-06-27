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
  }
];

@NgModule({
  declarations: [
    MidiasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class MidiaModule { }
