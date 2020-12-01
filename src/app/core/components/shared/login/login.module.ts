import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SharedModule } from '../shared-module.module';
/*
const ROUTES: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'criar', component: CadastroComponent },
];*/

@NgModule({
  declarations: [
    //LoginComponent,
    //CadastroComponent
  ],
  imports: [
    CommonModule,
    //SharedModule,
    //RouterModule.forChild(ROUTES),
  ]
})
export class LoginModule { }
