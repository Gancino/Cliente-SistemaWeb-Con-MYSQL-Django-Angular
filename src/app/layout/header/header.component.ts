import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONST_HEADER_PAGE, ICONS } from '@data/constants';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { AuthService } from '@data/services/api/auth.service';
import { DisparadorService } from '@data/services/disparador/disparador.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  @Output() showMenu = new EventEmitter<any>();
  public data!: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private disparadorService: DisparadorService
  ) { 
    this.data = CONST_HEADER_PAGE;
    this.data.METHOD_MI_CUENTA= () => this.methodRoute(INTERNAL_ROUTES.PANEL_MI_CUENTA);
    this.data.ICONS_ROUTES = [
      {
        icon: ICONS.faHome,
        text: CONST_GLOBAL.MENUTXT.inicio,
        method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_MI_CUENTA)
      },
      {
        icon: ICONS.faResearchgate,
        text: CONST_GLOBAL.MENUTXT.investigacion,
        iconSubLinks: ICONS.faCaretDown,
        SUB_ICONS_ROUTES: [
          {
            subicon: ICONS.faProjectDiagram,
            subtext: CONST_GLOBAL.MENUTXT.proyectos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_INVESTIGACION.PROYECTO_LIST)
          }
        ]
      },
      {
        icon: ICONS.faIdCard,
        text: CONST_GLOBAL.MENUTXT.publicaciones,
        iconSubLinks: ICONS.faCaretDown,
        SUB_ICONS_ROUTES: [
          {
            subicon: ICONS.faNewspaper,
            subtext: CONST_GLOBAL.MENUTXT.articulos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.ARTICULO_LIST)
          },
          {
            subicon: ICONS.faBook,
            subtext: CONST_GLOBAL.MENUTXT.libros,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.LIBRO_LIST)
          },
          {
            subicon: ICONS.faMedal,
            subtext: CONST_GLOBAL.MENUTXT.pintelect,
            texthelp: CONST_GLOBAL.MENUTXT.pintelectuales,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.PINTELECTUAL_LIST)
          },
          {
            subicon: ICONS.faPaste,
            subtext: CONST_GLOBAL.MENUTXT.tesis,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.TESIS_LIST)
          },
          {
            subicon: ICONS.faBookOpen,
            subtext: CONST_GLOBAL.MENUTXT.congresos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.CONGRESO_LIST)
          }
        ]
      },
      {
        icon: ICONS.faImages,
        text: CONST_GLOBAL.MENUTXT.carousel,
        method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_CAROUSEL_LIST)
      },
      {
        icon: ICONS.faUsers,
        text: CONST_GLOBAL.MENUTXT.miembros,
        method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_MIEMBRO_LIST)

      },
      {
        icon: ICONS.faEye,
        text: CONST_GLOBAL.MENUTXT.ver,
        method: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_HOME)
      }
    ]
    this.cargarAvatar();
  }

  cargarAvatar(){
    if(this.authService.getUser.avatar == '' || this.authService.getUser.avatar == null ){
      this.data.AVATAR=this.data.AVATAR_DEFAULT;
    }else{
      this.data.AVATAR=this.data.PATH_MEDIA + this.authService.getUser.avatar;
    }
  }

  ngOnInit(): void {
    this.disparadorService.avatar.subscribe(avatar => {
      this.data.AVATAR = this.data.PATH_MEDIA + avatar;
    });
  }

  methodRoute(rut: string){
    this.router.navigateByUrl(rut);
    $("html, body").animate({ scrollTop: 0 }, 100);
  }
  
}
