import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiArticulo, IApiCarousel, IApiCongreso, IApiLibro, IApiMiembro, IApiPIntelectual, IApiProyecto, IApiTesis } from '@data/interfaces';
import { ApiClass } from '@data/schema/ApiClass.class';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService extends ApiClass {
  
  private title = 'Detalle de miembro';
  public currentFilter: BehaviorSubject<{filter: number}>;
  public namefilterLS = 'currentFilter';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
    this.currentFilter = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.namefilterLS))
    );
  }

  get getFilter(): {filter: number} {
    return this.currentFilter.value;
  }

  public setFilter ( filter: {filter: number}){
    localStorage.setItem(this.namefilterLS, JSON.stringify(filter));
  }

  //--------------------------------------------------------------------------//

  getTitle(): string{
    return this.title;
  }
  setTitle(t: string){
    this.title = t;
  }

  clearTitle(){
    this.title = "Detalle de miembro"
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all proyectos from api
   * @returns 
   */
   getAllProyectos(): Observable<{
    error: boolean,
    msg: string;
    data: IApiProyecto[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiProyecto[]};
    return this.http.get<IApiProyecto[]>(API_ROUTES.PUBLICAPI.PROYECTO) //'api/1.0/public/proyecto'
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one proyecto by id
   * @param id_pro number
   * @returns 
   */
  getProyectoById(id_pro: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiProyecto
  }> {
    const response = {error: false, msg: '', data: null as IApiProyecto};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.PROYECTODETAIL+ id_pro +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_INVESTIGACION.PROYECTOS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all articulos from api
   * @returns 
   */
   getAllArticulos(): Observable<{
    error: boolean,
    msg: string;
    data: IApiArticulo[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiArticulo[]};
    return this.http.get<IApiArticulo[]>(API_ROUTES.PUBLICAPI.ARTICULO) //'api/1.0/public/articulo'
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one articulo by id
   * @param id_art number
   * @returns 
   */
  getArticuloById(id_art: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiArticulo
  }> {
    const response = {error: false, msg: '', data: null as IApiArticulo};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.ARTICULODETAIL+ id_art +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.ARTICULOS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all libros from api
   * @returns 
   */
   getAllLibros(): Observable<{
    error: boolean,
    msg: string;
    data: IApiLibro[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiLibro[]};
    return this.http.get<IApiLibro[]>(API_ROUTES.PUBLICAPI.LIBRO) //'api/1.0/public/libro'
    .pipe(
      map( r => {
        response.data = r;
        r.map(i => {
          if(i.tipo_lib === '1'){
            i.tipo_lib ='Libro';
          }else if(i.tipo_lib === '2'){
            i.tipo_lib ='Capítulo de Libro';
          }
        });
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one libro by id
   * @param id_lib number
   * @returns 
   */
  getLibroById(id_lib: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiLibro
  }> {
    const response = {error: false, msg: '', data: null as IApiLibro};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.LIBRODETAIL+ id_lib +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.LIBROS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all propiedad intelectual from api
   * @returns 
   */
   getAllPIntelectuales(): Observable<{
    error: boolean,
    msg: string;
    data: IApiPIntelectual[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiPIntelectual[]};
    return this.http.get<IApiPIntelectual[]>(API_ROUTES.PUBLICAPI.PINTELECTUAL) //'api/1.0/public/pintelectual'
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one propiedad intelectual by id
   * @param id_pin number
   * @returns 
   */
  getPIntelectualById(id_pin: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiPIntelectual
  }> {
    const response = {error: false, msg: '', data: null as IApiPIntelectual};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.PINTELECTUALDETAIL+ id_pin +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.PINTELECTUALES_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all tesis from api
   * @returns 
   */
   getAllTesis(): Observable<{
    error: boolean,
    msg: string;
    data: IApiTesis[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiTesis[]};
    return this.http.get<IApiTesis[]>(API_ROUTES.PUBLICAPI.TESIS) //'api/1.0/public/tesis'
    .pipe(
      map( r => {
        response.data = r;
        r.map(i => {
          if(i.tipo_tes === '1'){
            i.tipo_tes ='Pregrado';
          }else if(i.tipo_tes === '2'){
            i.tipo_tes ='Posgrado';
          }else if(i.tipo_tes === '3'){
            i.tipo_tes ='Doctorado';
          }
        });
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one tesis by id
   * @param id_tes number
   * @returns 
   */
  getTesisById(id_tes: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiTesis
  }> {
    const response = {error: false, msg: '', data: null as IApiTesis};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.TESISDETAIL+ id_tes +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.TESIS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all congresos from api
   * @returns 
   */
   getAllCongresos(): Observable<{
    error: boolean,
    msg: string;
    data: IApiCongreso[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiCongreso[]};
    return this.http.get<IApiCongreso[]>(API_ROUTES.PUBLICAPI.CONGRESO) //'api/1.0/public/congreso'
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one congreso by id
   * @param id_con number
   * @returns 
   */
  getCongresoById(id_con: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiCongreso
  }> {
    const response = {error: false, msg: '', data: null as IApiCongreso};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.CONGRESODETAIL+ id_con +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.CONGRESOS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //--------------------------------------------------------------------------//

  /**
   * Get all miembros from api
   * @returns 
   */
  getAllMiembros(): Observable<{
    error: boolean,
    msg: string;
    data: IApiMiembro[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiMiembro[]};
    return this.http.get<IApiMiembro[]>(API_ROUTES.PUBLICAPI.MIEMBRO) //'api/1.0/public/miembro'
    .pipe(
      map( r => {
        response.data = r;
        r.map(i => {
          if(i.tipo_miem === '1'){
            i.tipo_miem ='Miembro de interés';
          }else if(i.tipo_miem === '2'){
            i.tipo_miem ='Colaborador';
          }
        });
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get filter miembros from api
   * @returns 
   */
   getMiemFilterList(val: any): Observable<{
    error: boolean,
    msg: string;
    data: IApiMiembro[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiMiembro[]};
    return this.http.get<IApiMiembro[]>(API_ROUTES.PUBLICAPI.MIEMBROFILTER+val) //'api/1.0/public/miembrofilter'
    .pipe(
      map( r => {
        response.data = r;
        r.map(i => {
          if(i.tipo_miem === '1'){
            i.tipo_miem ='Miembro de interés';
          }else if(i.tipo_miem === '2'){
            i.tipo_miem ='Colaborador';
          }
        });
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one miembro by id
   * @param id_miem number
   * @returns 
   */
  getMiembroById(id_miem: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiMiembro
  }> {
    const response = {error: false, msg: '', data: null as IApiMiembro};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.MIEMBRODETAIL+ id_miem +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_MIEBROS_LIST)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //---------------------------------------------------------------------------------//

  /**
   * Get all imágenes del carousel from api
   * @returns 
   */
   getAllCarousel(): Observable<{
    error: boolean,
    msg: string;
    data: IApiCarousel[]
  }> {
    const response = {error: false, msg: '', data: [] as IApiCarousel[]};
    return this.http.get<IApiCarousel[]>(API_ROUTES.PUBLICAPI.CAROUSEL) //'api/1.0/public/carousel'
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one miembro by id
   * @param id_car number
   * @returns 
   */
  getCarouselById(id_car: number):Observable<{
    error: boolean,
    msg: string,
    data: IApiCarousel
  }> {
    const response = {error: false, msg: '', data: null as IApiCarousel};
    return this.http.get<{error: boolean, msg: string, data: any}>(API_ROUTES.PUBLICAPI.CAROUSELDETAIL+ id_car +'/') 
    .pipe(
      map( r => {
        response.msg = r.msg;
        response.data = r.data;
        response.error = r.error;
        if(response.error){
          this.router.navigateByUrl(INTERNAL_ROUTES.PUBLIC_HOME)
        }
        return response
      }),
      catchError(this.error)
    );
  }

  //---------------------------------------------------------------------------------//
}
