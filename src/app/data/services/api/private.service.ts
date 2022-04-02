import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES } from '@data/constants/routes';
import { IApiCategoria, IApiContenido, IApiMiembro } from '@data/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor(
    private http: HttpClient
  ) { }

  getCatList():Observable<IApiCategoria[]>{
    return this.http.get<IApiCategoria[]>(API_ROUTES.API.CATEGORIA);
  }

  addCategoria(
    data: {
      nombre_cat: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CATEGORIA, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateCategoria(
    data: {
      id_cat: string;
      nombre_cat: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CATEGORIA, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  deleteCategoria(val:any){
    return this.http.delete(API_ROUTES.API.CATEGORIA+val);
  }

  //--------------------------------------------------------------------------------------------//

  getContList():Observable<IApiContenido[]>{
    return this.http.get<IApiContenido[]>(API_ROUTES.API.CONTENIDO);
  }

  addContenido( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONTENIDO, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateContenido( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONTENIDO, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  deleteContenido(val:any){
    return this.http.delete(API_ROUTES.API.CONTENIDO+val);
  }

  //--------------------------------------------------------------------------------------//

  getMiemList():Observable<IApiMiembro[]>{
    return this.http.get<IApiMiembro[]>(API_ROUTES.API.MIEMBRO);
  }
  
  addMiembro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: any, data: any}>(API_ROUTES.API.MIEMBRO, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          if(r.error){
            response.msg = r.msg.correo_miem.toString()
          }
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateMiembro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: any, data: any}>(API_ROUTES.API.MIEMBRO, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          if(r.error){
            response.msg = r.msg.correo_miem.toString()
          }
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  deleteMiembro(val:any){
    return this.http.delete(API_ROUTES.API.MIEMBRO+val);
  }

  //----------------------------------------------------------------------------------------------//
  
  getThemeList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.THEME);
  }

  addTheme(
    data: {
      nombre_th: string;
      posicion_th: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.THEME, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateTheme(
    data: {
      id_th: string;
      nombre_th: string;
      posicion_th: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.THEME, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //console.log(r.data);
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  deleteTheme(val:any){
    return this.http.delete(API_ROUTES.API.THEME+val);
  }

  //---------------------------------------------------------------------------------------------//
  UploadImage(val:any){
    return this.http.post(API_ROUTES.API.SAVEIMAGE,val);
  }

  UploadFile(val:any){
    return this.http.post(API_ROUTES.API.SAVEFILE,val);
  }

  getAllCategoriaNombres():Observable<IApiCategoria[]>{
    return this.http.get<IApiCategoria[]>(API_ROUTES.API.CATEGORIA);
  }

}

  /*
  addContenido(val:any){
    return this.http.post(API_ROUTES.API.CONTENIDO,val);
  }

  updateContenido(val:any){
    return this.http.put(API_ROUTES.API.CONTENIDO,val);
  }
  */
