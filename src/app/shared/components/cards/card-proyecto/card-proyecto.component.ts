import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiProyecto } from '@data/interfaces';

@Component({
  selector: 'app-card-proyecto',
  templateUrl: './card-proyecto.component.html',
  styleUrls: ['./card-proyecto.component.scss']
})
export class CardProyectoComponent {

  @Input() data!: IApiProyecto;
  public routeProyectos!: string;
  
  constructor() { 
    this.routeProyectos = INTERNAL_ROUTES.PUBLIC_INVESTIGACION.PROYECTOS_LIST;
  }

}
