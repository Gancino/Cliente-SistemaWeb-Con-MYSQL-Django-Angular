import { CONST_GLOBAL } from "@data/constants/global.const";
import { ICONS } from "@data/constants/icons/icons.const";

export const CONST_NAVIGATION_PUBLIC_PAGE: {
    LOGO: string,
    ICON: any,
    IDICONMENU: string,
    IDNAVMENU: string,
    menu: boolean,
    menu_investigacion: boolean,
    menu_publicaciones: boolean,
    menu_miembros: boolean,
    menuMovil: boolean,
    contClick: any[],
    SUBMENU_INVESTIGACION: string,
    SUBMENU_PUBLICACIONES: string,
    SUBMENU_MIEMBROS: string
} = {
    LOGO: CONST_GLOBAL.LOGOPUBLIC,
    ICON: ICONS.faBars,
    IDICONMENU: 'menuList',
    IDNAVMENU: 'navMenu',
    menu: false,
    menu_investigacion: false,
    menu_publicaciones: false,
    menu_miembros: false,
    menuMovil: false,
    contClick: [0, 0, 0],
    SUBMENU_INVESTIGACION: CONST_GLOBAL.MENUTXT.investigacion,
    SUBMENU_PUBLICACIONES: CONST_GLOBAL.MENUTXT.publicaciones,
    SUBMENU_MIEMBROS: CONST_GLOBAL.MENUTXT.miembros
}