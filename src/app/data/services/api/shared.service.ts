import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES } from '@data/constants/routes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  getCatList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.CATEGORIA);
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
          console.log(r.data);
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

  getContList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.CONTENIDO);
  }

  /*
  addContenido(val:any){
    return this.http.post(API_ROUTES.API.CONTENIDO,val);
  }

  updateContenido(val:any){
    return this.http.put(API_ROUTES.API.CONTENIDO,val);
  }
  */

  addContenido(
    data: {
      titulo_con: string;
      descripcion_con: string;
      archivo_con: string;
      imagen_con: string;
      fecha_con: string;
      autor_con: string;
      fk_id_cat: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONTENIDO, data)
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

  updateContenido(
    data: {
      id_con: string;
      titulo_con: string;
      descripcion_con: string;
      archivo_con: string;
      imagen_con: string;
      fecha_con: string;
      autor_con: string;
      fk_id_cat: string;
    }
  ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONTENIDO, data)
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

  getMiemList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.MIEMBRO);
  }
  
  addMiembro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.MIEMBRO, formData)
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

  updateMiembro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.MIEMBRO, formData)
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


  deleteMiembro(val:any){
    return this.http.delete(API_ROUTES.API.MIEMBRO+val);
  }


  UploadImage(val:any){
    return this.http.post(API_ROUTES.API.SAVEIMAGE,val);
  }

  UploadFile(val:any){
    return this.http.post(API_ROUTES.API.SAVEFILE,val);
  }

  getAllCategoriaNombres():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.CATEGORIA);
  }

}
