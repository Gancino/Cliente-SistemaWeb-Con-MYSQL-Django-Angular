import { Component, Input, OnInit } from '@angular/core';
import { API_ROUTES, IMAGES_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiMiembro } from '@data/interfaces';

@Component({
  selector: 'app-card-miembro',
  templateUrl: './card-miembro.component.html',
  styleUrls: ['./card-miembro.component.scss']
})
export class CardMiembroComponent implements OnInit {

  @Input() data!: IApiMiembro;
  public PhotoFilePath!: String;
  public routeMiembros!: string;
  
  constructor() { 
    this.PhotoFilePath = IMAGES_ROUTES.LOADER_IMG;
    this.routeMiembros = INTERNAL_ROUTES.PUBLIC_MIEBROS_LIST;
  }

  ngOnInit(): void {
    if(this.data.imagen_miem == '' || this.data.imagen_miem == null ){
      this.PhotoFilePath=IMAGES_ROUTES.USER_CONTENT;
    }else{
      this.PhotoFilePath=API_ROUTES.MEDIA.DEFAULT+this.data.imagen_miem;
    }
  }

}
