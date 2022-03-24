import { environment as ENV } from "environments/environment";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${ENV.uri}/auth/login/`,
        LOGOUT: `${ENV.uri}/auth/logout/`
    },
    PhotoUrl: {
        MEDIA: `${ENV.uri}`,
        IMAGEN: `${ENV.uri}/media/`
    },
    API: {
        CATEGORIA: `${ENV.uri}/api/1.0/categoria/`,
        CONTENIDO: `${ENV.uri}/api/1.0/contenido/`,
        MIEMBRO: `${ENV.uri}/api/1.0/miembro/`,
        SAVEIMAGE: `${ENV.uri}/api/1.0/guardarImagen/`,
        SAVEFILE: `${ENV.uri}/api/1.0/guardarArchivo/`,
        SAVEIMAGEUSER: `${ENV.uri}/users/guardarImagen/`,
        THEME: `${ENV.uri}/api/1.0/theme/`,
    },
    PUBLICAPI:{
        CATEGORIA: `${ENV.uri}/api/1.0/public/categoria/`,
        CATEGORIADETAIL: `${ENV.uri}/api/1.0/public/categoriadetail/`,
        CONTENIDO: `${ENV.uri}/api/1.0/public/contenido/`,
        CONTENIDODETAIL: `${ENV.uri}/api/1.0/public/contenidodetail/`,
        MIEMBRO: `${ENV.uri}/api/1.0/public/miembro/`,
        MIEMBRODETAIL: `${ENV.uri}/api/1.0/public/miembrodetail/`,
    },
    USERS: {
        UPDATE: `${ENV.uri}/users/update/`,
    }
};