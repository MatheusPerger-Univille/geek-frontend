import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/components/shared/shared-module.module';
import { SeriesComponent } from './series/series.component';
import { SerieComponent } from './serie/serie.component';
import { InformacoesSerieComponent } from './serie/informacoes-serie/informacoes-serie.component';

const ROUTES: Routes = [
  { path: '', component: SeriesComponent, pathMatch: 'full' },
  { path: 'criar', component: SerieComponent },
  { path: 'editar/:id', component: SerieComponent },
];

@NgModule({
  declarations: [SeriesComponent, 
                SerieComponent, 
                InformacoesSerieComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class SeriesModule { }
