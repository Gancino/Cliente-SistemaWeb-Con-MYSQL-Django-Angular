import { CONST_GLOBAL } from "@data/constants/global.const";
import { ICONS } from "@data/constants/icons/icons.const";

export const CONST_FOOTER_PAGE: {
    MENSAJES: {
        uno: string,
        dos: string
    },
    ICONSHREFS: {
        icon: any,
        href: string
    }[];
} = {
    MENSAJES: {
        uno: 'Creado por Franklin Gancino |',
        dos: '| Todos los derechos reservados'
    },
    ICONSHREFS: [
        {
            icon: ICONS.faYoutube,
            href: CONST_GLOBAL.YOUTUBE
        },
        {
            icon: ICONS.faTwitter,
            href: CONST_GLOBAL.TWITTER
        },
        {
            icon: ICONS.faFacebook,
            href: CONST_GLOBAL.FACEBOOK
        }
    ]
}