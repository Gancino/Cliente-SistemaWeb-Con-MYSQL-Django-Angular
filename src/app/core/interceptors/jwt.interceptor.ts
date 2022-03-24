import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@data/services/api/auth.service";
import { Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){ }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.getUser;
        const isAuthenticated = currentUser && currentUser.token
        if(isAuthenticated){
            req = req.clone({
                setHeaders:{
                    Authorization: `Token ${currentUser.token}`
                }
            });
        }
        return next.handle(req)
    }
    
}