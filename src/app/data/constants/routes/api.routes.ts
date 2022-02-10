import { environment as ENV } from "environments/environment";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${ENV.uri}/auth/login/`
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
    },
    USERS: {
        UPDATE: `${ENV.uri}/users/update/`,
    }
};