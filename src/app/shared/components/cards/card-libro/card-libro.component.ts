import { Component, Input } from '@angular/core';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { IApiLibro } from '@data/interfaces';

@Component({
  selector: 'app-card-libro',
  templateUrl: './card-libro.component.html',
  styleUrls: ['./card-libro.component.scss']
})
export class CardLibroComponent {

  @Input() data!: IApiLibro;
  public routeLibros!: string;
  
  constructor() { 
    this.routeLibros = INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.LIBROS_LIST;
  }

}
