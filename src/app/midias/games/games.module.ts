import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { SharedModule } from 'src/app/core/components/shared/shared-module.module';
import { GameComponent } from './game/game.component';
import { InformacoesGameComponent } from './game/informacoes-game/informacoes-game.component';

const ROUTES: Routes = [
  { path: '', component: GamesComponent, pathMatch: 'full' },
  { path: 'criar', component: GameComponent },
  { path: 'editar/:id', component: GameComponent },
];

@NgModule({
  declarations: [
    GamesComponent,
    GameComponent,
    InformacoesGameComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class GamesModule { }
