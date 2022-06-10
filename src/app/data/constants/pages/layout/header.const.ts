import { CONST_GLOBAL } from "@data/constants/global.const";
import { ICONS } from "@data/constants/icons/icons.const";
import { API_ROUTES, IMAGES_ROUTES } from "@data/constants/routes";

export const CONST_HEADER_PAGE: {
    LOGO: string,
    LOGOMSG: string,
    ICONFABARS: any,
    METHOD_MI_CUENTA?: () => any,
    PATH_MEDIA: string,
    AVATAR: string,
    AVATAR_DEFAULT: string,
    SUBMENU_INVESTIGACION: string,
    SUBMENU_PUBLICACIONES: string,
    IDNAVHEADER: string,
    ICONS_ROUTES?: {
        icon: any,
        method?: () => any,
        text?: string,
        iconSubLinks?: any,
        SUB_ICONS_ROUTES?: {
            subicon: any,
            submethod?: () => any,
            subtext?: string,
            texthelp?: string
        }[];
    } [];
} = {
    LOGO: CONST_GLOBAL.LOGO,
    LOGOMSG: CONST_GLOBAL.LOGOMSG,
    ICONFABARS: ICONS.faBars,
    PATH_MEDIA: API_ROUTES.MEDIA.DEFAULT,
    AVATAR: IMAGES_ROUTES.LOADER_IMG,
    AVATAR_DEFAULT: IMAGES_ROUTES.USER_HEADER_LEFTNAV,
    SUBMENU_INVESTIGACION: CONST_GLOBAL.MENUTXT.investigacion,
    SUBMENU_PUBLICACIONES: CONST_GLOBAL.MENUTXT.publicaciones,
    IDNAVHEADER: 'leftNavHeader'
}