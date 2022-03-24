import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiClass } from '@data/schema/ApiClass.class';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService extends ApiClass {
  
  private title = 'Detalle de miembro';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
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


  /**
   * Get all miembros from api
   * @returns 
   */
  getAllMiembros(): Observable<{
    error: boolean,
    msg: string;
    data: ICardUser[]
  }> {
    const response = {error: false, msg: '', data: [] as ICardUser[]};
    return this.http.get<ICardUser[]>(API_ROUTES.PUBLICAPI.MIEMBRO) //'api/1.0/users'
    .pipe(
      map( r => {
        response.data = r;
        /*
        r.map(i => {
          if(i.gender ==='' || i.gender === null){
            i.gender ='S/N';
          }
        });
        */
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
    data: ICardUser
  }> {
    const response = {error: false, msg: '', data: null as ICardUser};
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
  

}
