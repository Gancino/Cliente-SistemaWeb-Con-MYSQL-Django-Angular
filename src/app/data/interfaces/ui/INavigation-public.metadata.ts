export interface INavigationPublicMenu {
    icon: any,
    name: string,
    method?: () => any,
    iconsubLinks?: any,
    sublinks?: {
        subicon: any,
        subname: string,
        submethod?: () => any
    } [];
}[];