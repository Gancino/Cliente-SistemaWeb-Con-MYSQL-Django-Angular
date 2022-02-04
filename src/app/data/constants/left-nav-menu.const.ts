import { ILeftNavMenu } from "@data/interfaces";
import { faUser, faCog, faIndent, faIdCard, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { INTERNAL_ROUTES } from "./routes";

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
            }
        ]
    },
    {
        title: 'Administración',
        links: [
            {
                icon: faIndent,
                name: 'Categorias'
            },
            {
                icon: faIdCard,
                name: 'Contenidos'
            },
            {
                icon: faUsers,
                name: 'Miembros'
            }
        ]
    }
]

/*
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
*/