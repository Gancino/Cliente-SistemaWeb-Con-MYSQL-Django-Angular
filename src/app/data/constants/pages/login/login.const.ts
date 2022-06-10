import { ERRORS_VALIDATIONS } from "@data/constants";
import { CONST_GLOBAL } from "@data/constants/global.const";
import { ICONS } from "@data/constants/icons/icons.const";
import { INTERNAL_ROUTES } from "@data/constants/routes";
import { IMAGES_ROUTES } from "@data/constants/routes/images.routes";
import { ENUM_VALIDATION_OPTIONS } from "@data/enum";
import { IField } from "@data/interfaces";
import { ValidationsService } from "@shared/services/validations/validations.service";
declare var $: any;

export const CONST_LOGIN_PAGE: {
    FORM: {
        email: IField,
        password: IField,
    },
    ICONSSOCIALS: {
        icon: any,
        href: string
    } [],
    STYLE_BACKGROUND: any,
    LOGO: string,
    ROUTE_INICIO: {txt: string, route: string, method: () => any},
    HREFS: {
        txt: string,
        href: string
    } []
} = {
    FORM: {
        email: {
            val: '',
            error: ERRORS_VALIDATIONS.EMAIL_REQUIRED_FIELD,
            isValid() {
                const validationsService = new ValidationsService();
                const validateEmail = validationsService.validateField(this.val, ENUM_VALIDATION_OPTIONS.EMAIL);
                this.error = validateEmail.msg;
                return validateEmail.isValid;
            }
        },
        password: {
            val: '',
            error: ERRORS_VALIDATIONS.PASSWORD_REQUIRED_FIELD,
            isValid() {
                const validationsService = new ValidationsService();
                const validatePassword = validationsService.validateField(this.val, ENUM_VALIDATION_OPTIONS.PASSWORD);
                this.error = validatePassword.msg;
                return validatePassword.isValid;
            }
        }
    },
    ICONSSOCIALS: [
        {
            icon: ICONS.faFacebookSquare,
            href: CONST_GLOBAL.FACEBOOK
        },
        {
            icon: ICONS.faTwitterSquare,
            href: CONST_GLOBAL.TWITTER
        },
        {
            icon: ICONS.faInstagramSquare,
            href: CONST_GLOBAL.INSTAGRAM
        }
    ],
    STYLE_BACKGROUND: {
        backgroundImage: `url(${IMAGES_ROUTES.BACKGROUND_LOGIN})`
    },
    LOGO: IMAGES_ROUTES.LOGO,
    ROUTE_INICIO: { 
        txt: CONST_GLOBAL.MENUTXT.inicio, 
        route: INTERNAL_ROUTES.PUBLIC_HOME,
        method: () => {
            $("html, body").animate({ scrollTop: 0 }, 100);
        }
    },
    HREFS: [
        {
            txt: CONST_GLOBAL.MENUTXT.acercade,
            href: CONST_GLOBAL.ACERCA_DE
        },
        {
            txt: CONST_GLOBAL.MENUTXT.contactanos,
            href: CONST_GLOBAL.CONTACTANOS
        },
        {
            txt: CONST_GLOBAL.MENUTXT.blog,
            href: CONST_GLOBAL.BLOG
        }
    ]
}