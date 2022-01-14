export interface ILeftNavMenu {
    title: string;
    links: {
        icon: any;
        name: string;
        link?: string;
        method?: () => any;
    }[];
};