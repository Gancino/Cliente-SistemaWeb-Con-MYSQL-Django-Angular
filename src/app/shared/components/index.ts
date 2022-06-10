// importar componentes
import { CardMiembroComponent } from './cards/card-miembro/card-miembro.component';
import { CardFileComponent } from './cards/card-file/card-file.component';
import { SliderComponent } from './slider/slider.component';
import { TitleH1Component } from './titles/title-h1/title-h1.component';
import { CardLoaderComponent } from './loaders/card-loader/card-loader.component';
import { SliderLoaderComponent } from './loaders/slider-loader/slider-loader.component';
import { CardProyectoComponent } from './cards/card-proyecto/card-proyecto.component';
import { CardArticuloComponent } from './cards/card-articulo/card-articulo.component';
import { CardLibroComponent } from './cards/card-libro/card-libro.component';
import { CardPIntelectualComponent } from './cards/card-p-intelectual/card-p-intelectual.component';
import { CardTesisComponent } from './cards/card-tesis/card-tesis.component';
import { CardCongresoComponent } from './cards/card-congreso/card-congreso.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

export const components: any[] = [
    CardMiembroComponent,
    CardFileComponent,
    CardProyectoComponent,
    CardArticuloComponent,
    CardLibroComponent,
    CardPIntelectualComponent,
    CardTesisComponent,
    CardCongresoComponent,
    SliderComponent,
    TitleH1Component,
    //Loaders
    CardLoaderComponent,
    SliderLoaderComponent,
    //ScrollTop
    ScrollToTopComponent
];

// exportar componentes
export * from './cards/card-miembro/card-miembro.component';
export * from './cards/card-file/card-file.component';
export * from './cards/card-proyecto/card-proyecto.component';
export * from './cards/card-articulo/card-articulo.component';
export * from './cards/card-libro/card-libro.component';
export * from './cards/card-p-intelectual/card-p-intelectual.component';
export * from './cards/card-tesis/card-tesis.component';
export * from './cards/card-congreso/card-congreso.component';
export * from './slider/slider.component';
export * from './titles/title-h1/title-h1.component';
export * from './loaders/card-loader/card-loader.component';
export * from './loaders/slider-loader/slider-loader.component';
export * from './scroll-to-top/scroll-to-top.component';