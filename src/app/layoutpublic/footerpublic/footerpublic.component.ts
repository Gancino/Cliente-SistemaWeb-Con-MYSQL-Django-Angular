import { Component } from '@angular/core';
import { CONST_FOOTER_PUBLIC_PAGE } from '@data/constants';

@Component({
  selector: 'app-footerpublic',
  templateUrl: './footerpublic.component.html',
  styleUrls: ['./footerpublic.component.scss']
})
export class FooterpublicComponent{

  public data!: any;

  constructor() { 
    this.data = CONST_FOOTER_PUBLIC_PAGE;
  }

}
