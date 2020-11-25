import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private jwtServ: JwtService) {}
  //
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => {},
        err => {
          if (
            err instanceof HttpErrorResponse &&
            (err.status === 403 || err.status === 401)
          ) {
            this.jwtServ.destroyToken();
          }
        }
      )
    );
  }
}
