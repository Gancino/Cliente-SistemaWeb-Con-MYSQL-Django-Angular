import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAuthenticated } from '@data/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as ENV } from "environments/environment";
import { DisparadorService } from '../disparador/disparador.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<IApiUserAuthenticated>;
  public nameUserLS = 'currentUserDesignicode';

  constructor(
    private http: HttpClient,
    private router: Router,
    private disparadorService: DisparadorService
  ) { 
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS))
    );
  }

  get getUser(): IApiUserAuthenticated {
    return this.currentUser.value;
  }

  login(
    data: {
      username: string;
      password: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.LOGIN.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.AUTH.LOGIN, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          this.setUserToLocalStorage(r.data);
          this.currentUser.next(r.data);
          if (!response.error){
            this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MI_CUENTA);
            $("html, body").animate({ scrollTop: 0 }, 100);
          }
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  logout() {
    return this.http.post<any>(API_ROUTES.AUTH.LOGOUT, {}).subscribe(r =>{
      localStorage.removeItem(this.nameUserLS);
      this.currentUser.next(null);
      this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
    });
  }

  errorlogout() {
    if(this.getUser){
      localStorage.removeItem(this.nameUserLS);
      this.currentUser.next(null);
    }
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  public setUserToLocalStorage ( user: IApiUserAuthenticated){
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
  }

  getMessage() {
    return this.http.get(ENV.uri);
  }

  UploadPhoto(val:any){
    return this.http.post(API_ROUTES.MEDIA.FILE,val);
  }

  UploadFile(val:any){
    return this.http.post(API_ROUTES.API.SAVEIMAGEUSER,val);
  }

  updateUser( formData:any, id:any): Observable <{       //retornara un observable
    error: boolean;
    msg: any;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: any, data: any}>(API_ROUTES.USERS.UPDATE+id+"/", formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          let avatar = this.getUser.avatar;
          if(!r.error){
            this.setUserToLocalStorage(r.data);
            this.currentUser = new BehaviorSubject(
              JSON.parse(localStorage.getItem(this.nameUserLS))
            );
            if(r.data.avatar !== '' && r.data.avatar !== null){
              if(r.data.avatar !== avatar){
                this.disparadorService.avatar.emit(r.data.avatar);
              }
            }
          }
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateUserCredentials( formData:any, id:any): Observable <{       //retornara un observable
    error: boolean;
    msg: any;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: any, data: any}>(API_ROUTES.USERS.UPDATECREDENTIALS+id+"/", formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          if(!r.error){
            this.setUserToLocalStorage(r.data);
            this.currentUser = new BehaviorSubject(
              JSON.parse(localStorage.getItem(this.nameUserLS))
            );
          }
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }
}