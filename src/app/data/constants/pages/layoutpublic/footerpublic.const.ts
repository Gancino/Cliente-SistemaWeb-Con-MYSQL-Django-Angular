import { CONST_GLOBAL } from "@data/constants/global.const"
import { ICONS } from "@data/constants/icons/icons.const";
import { IMAGES_ROUTES, INTERNAL_ROUTES } from "@data/constants/routes"
declare var $: any;

export const CONST_FOOTER_PUBLIC_PAGE: {
    ROUTER: {
        router: string,
        icon: any,
        method: () => any,
        txt: string
    }[],
    SOCIALS: {
        href: string,
        alt: string,
        icon: string
    }[]
} = {
    ROUTER : [
        {
            router: INTERNAL_ROUTES.PUBLIC_HOME,
            icon: ICONS.faHome,
            method: () => $("html, body").animate({ scrollTop: 0 }, 100),
            txt: CONST_GLOBAL.MENUTXT.inicio
        },
        {
            router: INTERNAL_ROUTES.PUBLIC_NOSOTROS_LIST,
            icon: ICONS.faUserFriends,
            method: () => $("html, body").animate({ scrollTop: 0 }, 100),
            txt: CONST_GLOBAL.MENUTXT.nosotros
        },
        {
            router: INTERNAL_ROUTES.AUTH_LOGIN,
            icon: ICONS.faUser,
            method: () => $("html, body").animate({ scrollTop: 0 }, 100),
            txt: CONST_GLOBAL.MENUTXT.administrar
        }
    ],
    SOCIALS : [
        {
            href: CONST_GLOBAL.FACEBOOK,
            alt: 'facebook',
            icon: IMAGES_ROUTES.ICON_FACEBOOK
        },
        {
            href: CONST_GLOBAL.TWITTER,
            alt: 'twitter',
            icon: IMAGES_ROUTES.ICON_TWITTER
        },
        {
            href: CONST_GLOBAL.YOUTUBE,
            alt: 'youtube',
            icon: IMAGES_ROUTES.ICON_YOUTUBE
        }
    ]
}