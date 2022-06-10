import { CONST_GLOBAL } from "@data/constants/global.const"
import { ICONS } from "@data/constants/icons/icons.const"
import { API_ROUTES, IMAGES_ROUTES } from "@data/constants/routes"

export const CONST_LEFT_NAV_PAGE: {
    LOGO: string,
    LOGOMSG: string,
    ICONFAARROWLEFT: any,
    PATH_MEDIA: string,
    AVATAR: string,
    AVATAR_DEFAULT: string,
    SUBMENU_PUBLICACIONES: boolean,
    SUBMENU_INVESTIGACION: boolean,
    IDLEFTNAV: string
} = {
    LOGO: CONST_GLOBAL.LOGO,
    LOGOMSG: CONST_GLOBAL.LOGOMSG,
    ICONFAARROWLEFT: ICONS.faArrowLeft,
    PATH_MEDIA: API_ROUTES.MEDIA.DEFAULT,
    AVATAR: IMAGES_ROUTES.LOADER_IMG,
    AVATAR_DEFAULT: IMAGES_ROUTES.USER_HEADER_LEFTNAV,
    SUBMENU_PUBLICACIONES: false,
    SUBMENU_INVESTIGACION: false,
    IDLEFTNAV: 'leftNav'
}