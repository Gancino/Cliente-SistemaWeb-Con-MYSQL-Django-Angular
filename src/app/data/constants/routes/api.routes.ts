import { environment as ENV } from "environments/environment";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${ENV.uri}auth/login/`
    },
    PhotoUrl: {
        IMAGEN: `${ENV.uri}media/`
    },
    API: {
        CATEGORIA: `${ENV.uri}api/1.0/categoria/`,
        CONTENIDO: `${ENV.uri}api/1.0/contenido/`,
        MIEMBRO: `${ENV.uri}api/1.0/miembro/`,
        SAVEFILE: `${ENV.uri}api/1.0/guardarArchivo/`,
    },
    USERS: {
        UPDATE: `${ENV.uri}users/update/`,
    }
};