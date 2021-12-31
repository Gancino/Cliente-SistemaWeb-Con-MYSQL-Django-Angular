import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClass } from '@data/schema/ApiClass.class';
import { ICardUser } from '@shared/components/cards/card-user/icard-user.metadata';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiClass {
  
  private title = 'Detalle de usuario';

  getTitle(): string{
    return this.title;
  }
  setTitle(t: string){
    this.title = t;
  }
  clearTitle(){
    this.title = "Detalle de usuario"
  }
  constructor(http: HttpClient) {
    super(http);
  }
  /**
   * Get all user from api
   * @returns 
   */
  getAllUsers(): Observable<{
    error: boolean,
    msg: string;
    data: ICardUser[]
  }> {
    const response = {error: false, msg: '', data: [] as ICardUser[]};
    return this.http.get<ICardUser[]>(this.url + 'users')
    .pipe(
      map( r => {
        response.data = r;
        r.map(i => {
          if(i.gender ==='' || i.gender === null){
            i.gender ='S/N';
          }
        });
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one user by id
   * @param id number
   * @returns 
   */
  getUserById(id: number):Observable<{
    error: boolean,
    msg: string,
    data: ICardUser
  }> {
    const response = {error: false, msg: '', data: null as ICardUser};
    return this.http.get<ICardUser>(this.url + 'users/' + id)
    .pipe(
      map( r => {
        response.data = r;
        return response
      }),
      catchError(this.error)
    );
  }
}
