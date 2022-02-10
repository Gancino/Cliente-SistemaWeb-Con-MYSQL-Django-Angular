import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiUserAuthenticated } from '@data/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as ENV } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<IApiUserAuthenticated>;
  public nameUserLS = 'currentUserDesignicode'; 
  
  constructor(
    private http: HttpClient,
    private router: Router
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
    localStorage.removeItem(this.nameUserLS);
    this.currentUser.next(null);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  cuenta() {
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MI_CUENTA);
  }

  categorias() {
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_CATEGORIA_LIST);
  }

  contenidos() {
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_CONTENIDO_LIST);
  }

  miembros() {
    this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_MIEMBRO_LIST);
  }

  publicContent() {
    this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_HOME);
  }
  public setUserToLocalStorage ( user: IApiUserAuthenticated){
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
  }

  getMessage() {
    return this.http.get(ENV.uri);
  }

  UploadPhoto(val:any){
    return this.http.post(API_ROUTES.PhotoUrl.IMAGEN,val);
  }

  UploadFile(val:any){
    return this.http.post(API_ROUTES.API.SAVEIMAGEUSER,val);
  }

  /*
  updateUser(val:any, id:any){
    return this.http.put(API_ROUTES.USERS.UPDATE+id+"/", val);
  }
  */
  updateUser(data: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    avatar: string;
    work: string;
  }, id:any
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.USERS.UPDATE+id+"/", data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          if(!r.error){
            this.setUserToLocalStorage(r.data);
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



//----------------------------------------------
/**
  getMessage() {
    return this.http.get(ENV.uri);
  }

  login2(username: string, password: string){
    return this.http.post<any>(ENV.uri + `auth/login/`,
      { username, password }, httpOptions).pipe(
        map(user => {
          if(user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout2(){
    localStorage.removeItem('currentUser');
  }
*/
