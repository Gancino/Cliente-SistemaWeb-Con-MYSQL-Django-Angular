import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { Observable } from 'rxjs';

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

  addCategoria(val:any){
    return this.http.post(API_ROUTES.API.CATEGORIA,val);
  }

  updateCategoria(val:any){
    return this.http.put(API_ROUTES.API.CATEGORIA,val);
  }

  deleteCategoria(val:any){
    return this.http.delete(API_ROUTES.API.CATEGORIA+val);
  }



  getContList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.CONTENIDO);
  }

  addContenido(val:any){
    return this.http.post(API_ROUTES.API.CONTENIDO,val);
  }

  updateContenido(val:any){
    return this.http.put(API_ROUTES.API.CONTENIDO,val);
  }

  deleteContenido(val:any){
    return this.http.delete(API_ROUTES.API.CONTENIDO+val);
  }



  getMiemList():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.MIEMBRO);
  }

  addMiembro(val:any){
    return this.http.post(API_ROUTES.API.MIEMBRO,val);
  }

  updateMiembro(val:any){
    return this.http.put(API_ROUTES.API.MIEMBRO,val);
  }

  deleteMiembro(val:any){
    return this.http.delete(API_ROUTES.API.MIEMBRO+val);
  }


  UploadFile(val:any){
    return this.http.post(API_ROUTES.API.SAVEFILE,val);
  }

  getAllCategoriaNombres():Observable<any[]>{
    return this.http.get<any[]>(API_ROUTES.API.CATEGORIA);
  }
}
