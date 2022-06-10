import { Component } from '@angular/core';
import { CONST_FOOTER_PAGE } from '@data/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  public data!: any;

  constructor() {
    this.data = CONST_FOOTER_PAGE;
  }

}
