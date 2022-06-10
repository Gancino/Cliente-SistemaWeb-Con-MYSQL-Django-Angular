import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiCongreso } from '@data/interfaces';

@Component({
  selector: 'app-card-congreso',
  templateUrl: './card-congreso.component.html',
  styleUrls: ['./card-congreso.component.scss']
})
export class CardCongresoComponent {

  @Input() data!: IApiCongreso;
  public routeCongresos!: string;
  
  constructor() { 
    this.routeCongresos = INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.CONGRESOS_LIST;
  }
}
