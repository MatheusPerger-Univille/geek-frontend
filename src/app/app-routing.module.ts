import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DevTestesComponent } from './core/components/shared/dev-testes/dev-testes.component';
import { BuscaResumidaComponent } from './busca-resumida/busca-resumida.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dev/testes', component: DevTestesComponent },
  { path: 'pesquisa/:termo', component: BuscaResumidaComponent },
  { path: 'pesquisa/:tipo/:categoria', component: BuscaResumidaComponent },
  {
    path: 'midias',
    loadChildren: () => import('./midias/midia.module').then(m => m.MidiaModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
