import { environment as ENV } from "environments/environment";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${ENV.uri}auth/login/`
    },
    PhotoUrl: {
        IMAGEN: `${ENV.uri}media/`
    }
};