import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { NotificationService } from '../components/shared/notification/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, private router: Router ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                switch(error.status) {
                    case 403:
                        this.handle403();
                        return;
                }

                return throwError(error);
            });
    }

    handle403() {
        NotificationService.error('Acesso negado, realize login novamente!');
        this.storage.setLocalUser(null);
        this.router.navigateByUrl('');

        setTimeout(() => {
            window.location.reload();
        }, 300);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};