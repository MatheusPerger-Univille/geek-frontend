import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataTablesModule } from 'angular-datatables';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MidiaComponent } from '../../../midias/midia/midia.component';
import { ImagemCapaComponent } from './upload-image/imagem-capa.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewImageModalComponent } from './upload-image/view-image-modal/view-image-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { PageTitleComponent } from './page-title/page-title.component';
import { AbstractComponentComponent } from './abstract-component/abstract-component.component';
import { DevTestesComponent } from './dev-testes/dev-testes.component';
import {MatSelectModule} from '@angular/material/select';

const MODULES = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  DataTablesModule,
  MatStepperModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  HttpClientModule,
  MatDialogModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    MidiaComponent,
    ImagemCapaComponent,
    ViewImageModalComponent,
    PageTitleComponent,
    AbstractComponentComponent,
    DevTestesComponent
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    MidiaComponent,
    ImagemCapaComponent,
    ViewImageModalComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }
