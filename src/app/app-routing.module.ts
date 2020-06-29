import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DevTestesComponent } from './core/components/shared/dev-testes/dev-testes.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dev/testes', component: DevTestesComponent },
  {
    path: 'midias',
    loadChildren: () => import('./midias/midia.module').then(m => m.MidiaModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
