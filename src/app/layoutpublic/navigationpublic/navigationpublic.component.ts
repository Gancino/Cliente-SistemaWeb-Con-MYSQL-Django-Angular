import { AfterViewInit, Component, HostListener} from '@angular/core';
import { CONST_NAVIGATION_PUBLIC_PAGE, ICONS } from '@data/constants';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { INavigationPublicMenu } from '@data/interfaces';
import { CONST_GLOBAL } from '@data/constants/global.const';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { PublicService } from '@data/services/api/public.service';
import { BehaviorSubject } from 'rxjs';
import { DisparadorService } from '@data/services/disparador/disparador.service';
declare var $: any;

@Component({
  selector: 'app-navigationpublic',
  templateUrl: './navigationpublic.component.html',
  styleUrls: ['./navigationpublic.component.scss']
})
export class NavigationpublicComponent implements AfterViewInit{

  public data!: any;
  public menus!: INavigationPublicMenu[];

  oritentation = this.breakObsrv.observe([
    '(max-width: 1127px)',
    '(orientation: portrait)',
    '(orientation: landscape)',
  ]);
  
  constructor(
    public breakObsrv: BreakpointObserver,
    public mediaMatcher: MediaMatcher,
    private router: Router,
    private service: PublicService,
    private disparadorService: DisparadorService
  ){ 
    this.data = CONST_NAVIGATION_PUBLIC_PAGE;
    this.menus = [
      {
        icon: ICONS.faHome,
        name: CONST_GLOBAL.MENUTXT.inicio,
        method: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_HOME)
      },
      {
        icon: ICONS.faResearchgate,
        name: CONST_GLOBAL.MENUTXT.investigacion,
        method: () => this.methodSubmenu('menu_investigacion', '.investigacionClass', 0),
        iconsubLinks: ICONS.faCaretDown,
        sublinks: [
          {
            subicon: ICONS.faProjectDiagram,
            subname: CONST_GLOBAL.MENUTXT.proyectos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_INVESTIGACION.PROYECTOS_LIST)
          }
        ]
      },
      {
        icon: ICONS.faIdCard,
        name: CONST_GLOBAL.MENUTXT.publicaciones,
        method: () => this.methodSubmenu('menu_publicaciones', '.publicacionesClass', 1),
        iconsubLinks: ICONS.faCaretDown,
        sublinks: [
          {
            subicon: ICONS.faNewspaper,
            subname: CONST_GLOBAL.MENUTXT.articulos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.ARTICULOS_LIST)
          },
          {
            subicon: ICONS.faBook,
            subname: CONST_GLOBAL.MENUTXT.libros,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.LIBROS_LIST)
          },
          {
            subicon: ICONS.faMedal,
            subname: CONST_GLOBAL.MENUTXT.pintelectuales,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.PINTELECTUALES_LIST)
          },
          {
            subicon: ICONS.faPaste,
            subname: CONST_GLOBAL.MENUTXT.tesis,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.TESIS_LIST)
          },
          {
            subicon: ICONS.faBookOpen,
            subname: CONST_GLOBAL.MENUTXT.congresos,
            submethod: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_PUBLICACIONES.CONGRESOS_LIST)
          }
        ]
      },
      {
        icon: ICONS.faUsers,
        name: CONST_GLOBAL.MENUTXT.miembros,
        method: () => this.methodSubmenu('menu_miembros', '.miembrosClass', 2),
        iconsubLinks: ICONS.faCaretDown,
        sublinks: [
          {
            subicon: ICONS.faUsers,
            subname: CONST_GLOBAL.MENUTXT.miembrosinteres,
            submethod: () => this.methodMiembros(1, INTERNAL_ROUTES.PUBLIC_MIEBROS_LIST)
          },
          {
            subicon: ICONS.faUsers,
            subname: CONST_GLOBAL.MENUTXT.colaboradores,
            submethod: () => this.methodMiembros(2, INTERNAL_ROUTES.PUBLIC_MIEBROS_LIST)
          },
          {
            subicon: ICONS.faUsers,
            subname: 'Todos',
            submethod: () => this.methodMiembros(0, INTERNAL_ROUTES.PUBLIC_MIEBROS_LIST)
          },
        ]
      },
      {
        icon: ICONS.faUserFriends,
        name: CONST_GLOBAL.MENUTXT.nosotros,
        method: () => this.methodRoute(INTERNAL_ROUTES.PUBLIC_NOSOTROS_LIST)
      },
      {
        icon: ICONS.faUser,
        name: CONST_GLOBAL.MENUTXT.administrar,
        method: () => this.methodRoute(INTERNAL_ROUTES.AUTH_LOGIN)
      }
    ]
  }

  methodRoute(rut: string){
    this.router.navigateByUrl(rut);
    $("html, body").animate({ scrollTop: 0 }, 100);
    if(this.data.menuMovil){ this.data.menu=false; }
  }

  methodSubmenu(tipMenu: string, clas: string, pos: number){
    if(this.data.menuMovil){
      this.data[tipMenu] =! this.data[tipMenu];
      $(clas).slideToggle();
      this.data.contClick[pos] = this.data.contClick[pos]+1;
    }
  }

  methodMiembros(filt: number, rut: string){
    this.service.setFilter({filter: filt});
    this.service.currentFilter = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.service.namefilterLS))
    );
    if(filt > 0){
      this.service.getMiemFilterList(filt).subscribe(r => {
        this.disparadorService.open.emit( (r.error) ? [] : r.data );
      });
    }else{
      this.service.getAllMiembros().subscribe(r => {
        this.disparadorService.open.emit( (r.error) ? [] : r.data );
      });
    }
    this.methodRoute(rut);
  }

  ngAfterViewInit(): void {
    this.oritentation.subscribe(lay => {
      const mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 1127px)');
      if(mediaQueryList.matches){//Con menu Movil
        this.data.menuMovil = true;
        $('header nav ul li').removeClass('submenuPC').addClass('submenuMovil');
        if(!this.data.menu){
          if(this.data.menu_investigacion && this.data.contClick[0] > 0){
            this.data.menu_investigacion = false;
            $('.investigacionClass').slideToggle();
          }
          if(this.data.menu_publicaciones && this.data.contClick[1] > 0){
            this.data.menu_publicaciones = false;
            $('.publicacionesClass').slideToggle();
          }
          if(this.data.menu_miembros && this.data.contClick[2] > 0){
            this.data.menu_miembros = false;
            $('.miembrosClass').slideToggle();
          }
        }
      }else{//Sin menu Movil
        this.data.menuMovil = false;
        $('header nav ul li').removeClass('submenuMovil').addClass('submenuPC');
        $('nav').animate({ left: '-100%' });
        this.data.menu=false;
        if(!this.data.menu){
          if((!this.data.menu_investigacion) && this.data.contClick[0] > 0){
            this.data.menu_investigacion = true;
            $('.investigacionClass').slideToggle();
          }
          if((!this.data.menu_publicaciones) && this.data.contClick[1] > 0){
            this.data.menu_publicaciones = true;
            $('.publicacionesClass').slideToggle();
          }
          if((!this.data.menu_miembros) && this.data.contClick[2] > 0){
            this.data.menu_miembros = true;
            $('.miembrosClass').slideToggle();
          }
        }
      }
    });
  }

  @HostListener('document:click', ['$event']) clickout(event:any) { 
    const menuList = document.getElementById(this.data.IDICONMENU);
    const navMenu = document.getElementById(this.data.IDNAVMENU);
    if(menuList.contains(event.target)) { 
      this.data.menu =! this.data.menu;
    }
    if(!navMenu.contains(event.target)) { 
      if(this.data.menu && !menuList.contains(event.target)){
        this.data.menu = false;
      }
    }
    if(this.data.menu){
      $('nav').animate({ left: '0' });
    }else{
      $('nav').animate({ left: '-100%' });
    }
  }
  
}
