export interface ILeftNavMenu {
    title: string;
    links: {
        icon: any;
        name: string;
        method?: () => any;
        iconsubLinks?: any;
        sublinks?: {
            subicon: any;
            subname: string;
            texthelp?: string;
            submethod?: () => any;
        }[];
    }[];
};