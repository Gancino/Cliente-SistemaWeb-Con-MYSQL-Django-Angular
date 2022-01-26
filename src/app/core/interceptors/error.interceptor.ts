import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor( private router: Router){ }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                console.log('interceptor');
                if(
                    [401, 403, 404].indexOf(err.status) !== -1
                ){
                    this.router.navigateByUrl('/' + err.status);
                }
                return throwError(err);
            })
        );
    }
    
}