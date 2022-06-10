import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiTesis } from '@data/interfaces';

@Component({
  selector: 'app-card-tesis',
  templateUrl: './card-tesis.component.html',
  styleUrls: ['./card-tesis.component.scss']
})
export class CardTesisComponent {

  @Input() data!: IApiTesis;
  public routeTesis!: string;
  
  constructor() { 
    this.routeTesis = INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.TESIS_LIST;
  }

}
