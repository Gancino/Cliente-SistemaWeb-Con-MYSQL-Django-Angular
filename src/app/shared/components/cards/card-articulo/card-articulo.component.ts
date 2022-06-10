import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiArticulo } from '@data/interfaces';

@Component({
  selector: 'app-card-articulo',
  templateUrl: './card-articulo.component.html',
  styleUrls: ['./card-articulo.component.scss']
})
export class CardArticuloComponent {

  @Input() data!: IApiArticulo;
  public routeArticulos!: string;
  
  constructor() { 
    this.routeArticulos = INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.ARTICULOS_LIST;
  }

}
