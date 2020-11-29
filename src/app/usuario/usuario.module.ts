import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../core/components/shared/shared-module.module';

const ROUTES: Routes = [
	{ path: '', component: UsuariosComponent, pathMatch: 'full' },
	{ path: 'criar', component: UsuarioComponent },
  	{ path: 'editar/:id', component: UsuarioComponent },
];

@NgModule({
	declarations: [
		UsuariosComponent, 
		UsuarioComponent
	],
	imports: [
		CommonModule,
		SharedModule,
    	RouterModule.forChild(ROUTES),
	]
})
export class UsuarioModule { }
