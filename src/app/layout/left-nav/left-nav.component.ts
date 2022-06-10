import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONST_HEADER_PAGE, CONST_LEFT_NAV_PAGE, ICONS } from '@data/constants';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ILeftNavMenu } from '@data/interfaces';
import { AuthService } from '@data/services/api/auth.service';
import { DisparadorService } from '@data/services/disparador/disparador.service';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  @Output() showMenu = new EventEmitter<any>();
  @Input() existMenu!: boolean;
  
  public menus!: ILeftNavMenu[]; // = LEFT_NAV_MENUS;
  public userSubscription!: Subscription;
  public data!: any;

  constructor(
    private skeleton: SkeletonComponent,
    public authService: AuthService,
    private router: Router,
    private disparadorService: DisparadorService
  ) { 
    this.data = CONST_LEFT_NAV_PAGE;
    this.menus = [
      {
        title: CONST_GLOBAL.MENUTXT.titleCuenta,
        links: [
          {
            icon: ICONS.faUser,
            name: CONST_GLOBAL.MENUTXT.perfil,
            method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_MI_CUENTA)
          },
          {
            icon: ICONS.faEye,
            name: CONST_GLOBAL.MENUTXT.ver,
            method: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_HOME)
          }
        ]
      },
      {
        title: CONST_GLOBAL.MENUTXT.titleAdministrar,
        links: [
          {
            icon: ICONS.faResearchgate,
            name: CONST_GLOBAL.MENUTXT.investigacion,
            iconsubLinks: ICONS.faCaretDown,
            method: () => {
              this.data.SUBMENU_INVESTIGACION =! this.data.SUBMENU_INVESTIGACION;
              if(this.data.SUBMENU_INVESTIGACION){
                $('.dsc-left-nav-menu__links__sublinksI').css('max-height','28px');
              }else{
                $('.dsc-left-nav-menu__links__sublinksI').css('max-height','0');
              }
            },
            sublinks: [
              {
                subicon: ICONS.faProjectDiagram,
                subname: CONST_GLOBAL.MENUTXT.proyectos,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_INVESTIGACION.PROYECTO_LIST)
              }
            ]
          },
          {
            icon: ICONS.faIdCard,
            name: CONST_GLOBAL.MENUTXT.publicaciones,
            iconsubLinks: ICONS.faCaretDown,
            method: () => {
              this.data.SUBMENU_PUBLICACIONES =! this.data.SUBMENU_PUBLICACIONES;
              if(this.data.SUBMENU_PUBLICACIONES){
                $('.dsc-left-nav-menu__links__sublinksP').css('max-height','140px');
              }else{
                $('.dsc-left-nav-menu__links__sublinksP').css('max-height','0');
              }
            },
            sublinks: [
              {
                subicon: ICONS.faNewspaper,
                subname: CONST_GLOBAL.MENUTXT.articulos,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.ARTICULO_LIST)
              },
              {
                subicon: ICONS.faBook,
                subname: CONST_GLOBAL.MENUTXT.libros,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.LIBRO_LIST)
              },
              {
                subicon: ICONS.faMedal,
                subname: CONST_GLOBAL.MENUTXT.pintelect,
                texthelp: CONST_GLOBAL.MENUTXT.pintelectuales,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.PINTELECTUAL_LIST)
              },
              {
                subicon: ICONS.faPaste,
                subname: CONST_GLOBAL.MENUTXT.tesis,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.TESIS_LIST)
              },
              {
                subicon: ICONS.faBookOpen,
                subname: CONST_GLOBAL.MENUTXT.congresos,
                submethod: () => this.methodRoute(INTERNAL_ROUTES.PANEL_PUBLICACIONES.CONGRESO_LIST)
              }
            ]
          },
          {
            icon: ICONS.faImages,
            name: CONST_GLOBAL.MENUTXT.carousel,
            method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_CAROUSEL_LIST)
          },
          {
            icon: ICONS.faUsers,
            name: CONST_GLOBAL.MENUTXT.miembros,
            method: () => this.methodRoute(INTERNAL_ROUTES.PANEL_MIEMBRO_LIST)
          }
        ]
      },
      {
        title : '',
        links: [
          {
            icon: ICONS.faTimes,
            name: CONST_GLOBAL.MENUTXT.logout,
            method: () => {
              this.skeleton.setIsLoader(true);
              setTimeout(() => {
                this.authService.logout();
                $("html, body").animate({ scrollTop: 0 }, 100);
              }, 1000)
            }
          }
        ]
      }
    ]
    this.cargarAvatar();
  }

  @HostListener('document:click', ['$event']) clickout(event:any) { 
    const leftNav = document.getElementById(this.data.IDLEFTNAV);
    const leftNavHeader = document.getElementById(CONST_HEADER_PAGE.IDNAVHEADER);
    if(!leftNav.contains(event.target) && this.existMenu && !leftNavHeader.contains(event.target)){
      this.showMenu.emit();
    }
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
    this.showMenu.emit();
  }

}
