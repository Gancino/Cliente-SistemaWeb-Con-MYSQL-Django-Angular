import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST } from '@data/constants';
import { API_ROUTES } from '@data/constants/routes';
import { IApiArchivo, IApiArticulo, IApiCarousel, IApiCongreso, IApiMiembro, IApiPIntelectual, IApiProyecto, IApiTesis } from '@data/interfaces';
import { IApiLibro } from '@data/interfaces/api/iapi-libros.metadata';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor(
    private http: HttpClient
  ) { }

  //--------------------------------------------------------------------------------------//

  getProList():Observable<IApiProyecto[]>{
    return this.http.get<IApiProyecto[]>(API_ROUTES.API.PROYECTO);
  }

  addProyecto( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.PROYECTO, formData)
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

  updateProyecto( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.PROYECTO, formData)
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

  deleteProyecto(val:any){
    return this.http.delete(API_ROUTES.API.PROYECTO+val);
  }

  //--------------------------------------------------------------------------------------//

  getArchList():Observable<IApiArchivo[]>{
    return this.http.get<IApiArchivo[]>(API_ROUTES.API.ARCHIVO);
  }

  getArchProList(val: any):Observable<IApiArchivo[]>{
    return this.http.get<IApiArchivo[]>(API_ROUTES.API.ARCHIVOPROYECTO+val);
  }

  addArchivo( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.ARCHIVO, formData)
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

  updateArchivo( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.ARCHIVO, formData)
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

  deleteArchivo(val:any){
    return this.http.delete(API_ROUTES.API.ARCHIVO+val);
  }

  //--------------------------------------------------------------------------------------//

  getArtList():Observable<IApiArticulo[]>{
    return this.http.get<IApiArticulo[]>(API_ROUTES.API.ARTICULO);
  }

  addArticulo( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.ARTICULO, formData)
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

  updateArticulo( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.ARTICULO, formData)
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

  deleteArticulo(val:any){
    return this.http.delete(API_ROUTES.API.ARTICULO+val);
  }

  //--------------------------------------------------------------------------------------//

  getLibList():Observable<IApiLibro[]>{
    return this.http.get<IApiLibro[]>(API_ROUTES.API.LIBRO);
  }

  addLibro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.LIBRO, formData)
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

  updateLibro( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.LIBRO, formData)
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

  deleteLibro(val:any){
    return this.http.delete(API_ROUTES.API.LIBRO+val);
  }

  //--------------------------------------------------------------------------------------//

  getPinList():Observable<IApiPIntelectual[]>{
    return this.http.get<IApiPIntelectual[]>(API_ROUTES.API.PINTELECTUAL);
  }

  addPIntelectual( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.PINTELECTUAL, formData)
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

  updatePIntelectual( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.PINTELECTUAL, formData)
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

  deletePIntelectual(val:any){
    return this.http.delete(API_ROUTES.API.PINTELECTUAL+val);
  }

  //--------------------------------------------------------------------------------------//

  getTesList():Observable<IApiTesis[]>{
    return this.http.get<IApiTesis[]>(API_ROUTES.API.TESIS);
  }

  addTesis( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.TESIS, formData)
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

  updateTesis( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.TESIS, formData)
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

  deleteTesis(val:any){
    return this.http.delete(API_ROUTES.API.TESIS+val);
  }

  //--------------------------------------------------------------------------------------//

  getConList():Observable<IApiCongreso[]>{
    return this.http.get<IApiCongreso[]>(API_ROUTES.API.CONGRESO);
  }

  addCongreso( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONGRESO, formData)
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

  updateCongreso( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: string, data: any}>(API_ROUTES.API.CONGRESO, formData)
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

  deleteCongreso(val:any){
    return this.http.delete(API_ROUTES.API.CONGRESO+val);
  }

  //--------------------------------------------------------------------------------------//

  getCarouselList():Observable<IApiCarousel[]>{
    return this.http.get<IApiCarousel[]>(API_ROUTES.API.CAROUSEL);
  }
  
  addCarousel( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.ADD.ERROR, data: null as any};
    return this.http.post<{error: boolean, msg: any, data: any}>(API_ROUTES.API.CAROUSEL, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  updateCarousel( formData:any ): Observable <{       //retornara un observable
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {error: true, msg: ERRORS_CONST.UPDATE.ERROR, data: null as any};
    return this.http.put<{error: boolean, msg: any, data: any}>(API_ROUTES.API.CAROUSEL, formData)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }

  deleteCarousel(val:any){
    return this.http.delete(API_ROUTES.API.CAROUSEL+val);
  }

  //----------------------------------------------------------------------------------------------//

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

  getThemeDetail(val: any):Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.THEMEDETAIL+val);
  }

  addTheme(
    data: {
      nombre_th: string;
      posicion_th: string;
      fk_id_usu: string;
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
      fk_id_usu: string;
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
  
}
