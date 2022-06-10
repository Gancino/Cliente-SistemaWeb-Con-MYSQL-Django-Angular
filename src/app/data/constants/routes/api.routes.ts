import { environment as ENV } from "environments/environment";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${ENV.uri}/auth/login/`,
        LOGOUT: `${ENV.uri}/auth/logout/`
    },
    MEDIA: {
        DEFAULT: `${ENV.uri}`,
        FILE: `${ENV.uri}/media/`,
        PHOTODEFAULT: `${ENV.uri}/media/anonymous.png`
    },
    API: {
        PROYECTO: `${ENV.uri}/api/1.0/proyecto/`,
        ARCHIVO: `${ENV.uri}/api/1.0/archivo/`,
        ARCHIVOPROYECTO: `${ENV.uri}/api/1.0/archivoproyecto/`,
        ARTICULO: `${ENV.uri}/api/1.0/articulo/`,
        LIBRO: `${ENV.uri}/api/1.0/libro/`,
        PINTELECTUAL: `${ENV.uri}/api/1.0/pintelectual/`,
        TESIS: `${ENV.uri}/api/1.0/tesis/`,
        CONGRESO: `${ENV.uri}/api/1.0/congreso/`,
        CAROUSEL: `${ENV.uri}/api/1.0/carousel/`,
        MIEMBRO: `${ENV.uri}/api/1.0/miembro/`,
        SAVEIMAGE: `${ENV.uri}/api/1.0/guardarImagen/`,
        SAVEFILE: `${ENV.uri}/api/1.0/guardarArchivo/`,
        SAVEIMAGEUSER: `${ENV.uri}/users/guardarImagen/`,
        THEME: `${ENV.uri}/api/1.0/theme/`,
        THEMEDETAIL: `${ENV.uri}/api/1.0/themedetail/`
    },
    PUBLICAPI:{
        PROYECTO: `${ENV.uri}/api/1.0/public/proyecto/`,
        PROYECTODETAIL: `${ENV.uri}/api/1.0/public/proyectodetail/`,
        ARTICULO: `${ENV.uri}/api/1.0/public/articulo/`,
        ARTICULODETAIL: `${ENV.uri}/api/1.0/public/articulodetail/`,
        LIBRO: `${ENV.uri}/api/1.0/public/libro/`,
        LIBRODETAIL: `${ENV.uri}/api/1.0/public/librodetail/`,
        PINTELECTUAL: `${ENV.uri}/api/1.0/public/pintelectual/`,
        PINTELECTUALDETAIL: `${ENV.uri}/api/1.0/public/pintelectualdetail/`,
        TESIS: `${ENV.uri}/api/1.0/public/tesis/`,
        TESISDETAIL: `${ENV.uri}/api/1.0/public/tesisdetail/`,
        CONGRESO: `${ENV.uri}/api/1.0/public/congreso/`,
        CONGRESODETAIL: `${ENV.uri}/api/1.0/public/congresodetail/`,
        CAROUSEL: `${ENV.uri}/api/1.0/public/carousel/`,
        CAROUSELDETAIL: `${ENV.uri}/api/1.0/public/carouseldetail/`,
        MIEMBRO: `${ENV.uri}/api/1.0/public/miembro/`,
        MIEMBROFILTER: `${ENV.uri}/api/1.0/public/miembrofilter/`,
        MIEMBRODETAIL: `${ENV.uri}/api/1.0/public/miembrodetail/`
    },
    USERS: {
        UPDATE: `${ENV.uri}/users/update/`,
        UPDATECREDENTIALS: `${ENV.uri}/users/updateCredentials/`
    }
};