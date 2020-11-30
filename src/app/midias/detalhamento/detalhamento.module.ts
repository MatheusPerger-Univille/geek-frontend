import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalhamentoComponent } from './detalhamento.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/core/components/shared/shared-module.module';

const ROUTES: Routes = [
	{ path: ':tipo/:id', component: DetalhamentoComponent, pathMatch: 'full' }
];

@NgModule({
	declarations: [
		DetalhamentoComponent
	],
	imports: [
		CommonModule,
		SharedModule,
    	RouterModule.forChild(ROUTES),
	]
})
export class DetalhamentoModule { }
