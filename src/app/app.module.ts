import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatCardModule } from  '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import { MatSnackBarModule } from  '@angular/material/snack-bar';
import { HttpClientModule } from  '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIComponent } from './core/components/blockui.component';
import { DataTablesModule } from 'angular-datatables';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from  '@angular/common';
import { PagingService } from './core/services/paging.service';
import { DataUtils } from './core/utils/data-utils';
import { NotificationService } from './core/components/shared/notification/notification.service';

import * as $ from 'jquery';
import { NotificationPipe } from './core/components/shared/notification/notification-pipe';

@NgModule({
  declarations: [
    AppComponent,
    BlockUIComponent,
    NotificationPipe
  ],
  entryComponents: [
    BlockUIComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlockUIModule.forRoot({
      template: BlockUIComponent,
      message: 'Carregando...',
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    DataTablesModule
  ],
  providers: [
    DataUtils,
    PagingService,
    NotificationService,
    {
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  exports: [
    NotificationPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
