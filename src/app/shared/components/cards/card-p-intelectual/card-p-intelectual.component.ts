import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiPIntelectual } from '@data/interfaces';

@Component({
  selector: 'app-card-p-intelectual',
  templateUrl: './card-p-intelectual.component.html',
  styleUrls: ['./card-p-intelectual.component.scss']
})
export class CardPIntelectualComponent {

  @Input() data!: IApiPIntelectual;
  public routePIntelectuales!: string;
  
  constructor() { 
    this.routePIntelectuales = INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.PINTELECTUALES_LIST;
  }

}
