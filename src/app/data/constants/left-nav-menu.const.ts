import { ILeftNavMenu } from "@data/interfaces";
import { faUser, faCog, faClipboard, faComment, faHeart, faBookmark, faChartLine, faCogs } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export const LEFT_NAV_MENUS: ILeftNavMenu[] = [
    {
        title: 'Mi cuenta',
        links: [
            {
                icon: faUser,
                name: 'Perfil'
            },
            {
                icon: faCog,
                name: 'Mi cuenta'
            },
            {
                icon: faClipboard,
                name: 'Historial'
            },
            {
                icon: faComment,
                name: 'Comentarios'
            }
        ]
    },
    {
        title: 'Servicios',
        links: [
            {
                icon: faYoutube,
                name: 'Videos'
            },
            {
                icon: faHeart,
                name: 'Favoritos'
            },
            {
                icon: faBookmark,
                name: 'Articulos'
            },
            {
                icon: faChartLine,
                name: 'Estadisticas'
            },
            {
                icon: faCogs,
                name: 'Settings'
            }
        ]
    }
]