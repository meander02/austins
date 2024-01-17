import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && !this.router.url.includes('/portal/not-found')) {
          console.log('Error 404 interceptado!!');
          this.router.navigateByUrl('portal/not-found');
        } else if (error.status === 403) {
          // Agregar lógica para el código de estado 403 si es necesario
        }
        return throwError(error);
      })
    );
  }
}
