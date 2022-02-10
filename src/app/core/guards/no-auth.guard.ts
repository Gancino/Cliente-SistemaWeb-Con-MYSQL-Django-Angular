import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';

@Injectable({
  providedIn: 'root'
})

//Si esta logeado y intenta acceder a los modulos de login, crear cuenta etc, se rediriga al panel principal
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    const curretUser = this.authService.getUser;
    if (curretUser) {
      this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MI_CUENTA);
      return false;
    }
    return true;
  }
  
}
