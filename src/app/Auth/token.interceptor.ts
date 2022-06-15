import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {  catchError, switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { StorageService } from '../Services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth:AuthService, private storage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return from(this.storage.getString('token'))
    .pipe(
        switchMap(token => {
            
        if (token.value) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.value) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
            return next.handle(request).pipe(
                catchError((err:HttpErrorResponse) => {
                    if (err.status == 401 || err.status == 403) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        this.auth.logout();
                    
                    }

                        let errorMessage:any;
                    if (err.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${err.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = err.error;
                    }

                    return throwError(errorMessage);
                })
            );
         })
    );

    }

}
