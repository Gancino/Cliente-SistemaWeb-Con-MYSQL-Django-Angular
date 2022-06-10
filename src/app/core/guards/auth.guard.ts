import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';

@Injectable({
  providedIn: 'root'
})

//Queremos que este logeado
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const curretUser = this.authService.getUser;
    if (curretUser){
      return true;
    }
    this.router.navigate([INTERNAL_ROUTES.AUTH_LOGIN],{
      queryParams: {retunUrl: state.url}
    });
    return false;
  }

}
