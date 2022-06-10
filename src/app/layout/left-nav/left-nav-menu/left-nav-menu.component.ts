import { Component, Input } from '@angular/core';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { ILeftNavMenu } from '@data/interfaces';

@Component({
  selector: 'app-left-nav-menu',
  templateUrl: './left-nav-menu.component.html',
  styleUrls: ['./left-nav-menu.component.scss']
})
export class LeftNavMenuComponent {

  @Input() data: ILeftNavMenu;
  @Input() submenuInvestigacion!: boolean;
  @Input() submenuPublicaciones!: boolean;

  public name_investigacion!: string;
  public name_publicaciones!: string;

  constructor() {
    this.name_investigacion = CONST_GLOBAL.MENUTXT.investigacion;
    this.name_publicaciones = CONST_GLOBAL.MENUTXT.publicaciones;
   }

}
