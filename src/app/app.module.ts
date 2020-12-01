import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIComponent } from './core/components/blockui.component';

import { PagingService } from './core/services/paging.service';
import { DataUtils } from './core/utils/data-utils';
import { NotificationService } from './core/components/shared/notification/notification.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationPipe } from './core/components/shared/notification/notification-pipe';
import { HeaderComponent } from './core/components/shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './core/components/shared/shared-module.module';

import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { NavMenuComponent } from './core/components/shared/nav-menu/nav-menu.component';
import { BuscaResumidaComponent } from './busca-resumida/busca-resumida.component';
import { AuthService } from './core/components/shared/login/auth.service';
import { StorageService } from './core/services/storage.service';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { ErrorInterceptor, ErrorInterceptorProvider } from './core/interceptors/error-interceptor';
import { AuthGuard } from './core/guard/auth.guard';

registerLocaleData(localePtBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    BlockUIComponent,
    NotificationPipe,
    HeaderComponent,
    HomeComponent,
    NavMenuComponent,
    BuscaResumidaComponent
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
    SharedModule
  ],
  providers: [
    DataUtils,
    PagingService,
    NotificationService,
    AuthInterceptor,
    AuthService,
    AuthGuard,
    StorageService,
    ErrorInterceptorProvider,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    NotificationPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
