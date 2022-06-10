import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { INTERNAL_PATHS, INTERNAL_ROUTES } from '@data/constants/routes';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { SkeletonpublicComponent } from '@layoutpublic/skeletonpublic/skeletonpublic.component';
import { Page0Component } from '@modules/server/page0/page0.component';
import { Page401Component } from '@modules/server/page401/page401.component';
import { Page404Component } from '@modules/server/page404/page404.component';
import { Page500Component } from '@modules/server/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: INTERNAL_ROUTES.PUBLIC_HOME,
    pathMatch: 'full'
  },
  {
    path: INTERNAL_ROUTES.SERVER_E_404,
    component: Page404Component
  },
  {
    path: INTERNAL_ROUTES.SERVER_E_0,
    component: Page0Component
  },
  {
    path: INTERNAL_ROUTES.SERVER_E_401,
    component: Page401Component
  },
  {
    path: INTERNAL_ROUTES.SERVER_E_500,
    component: Page500Component
  },
  {
    path: INTERNAL_PATHS.AUTH_DEFAULT,
    loadChildren: () => 
      import ('@modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: INTERNAL_PATHS.PUBLIC_DEFAULT,
    component: SkeletonpublicComponent,
    children: [
      {
        path: INTERNAL_PATHS.PUBLIC_HOME,
        loadChildren: () =>
          import('@modulespublic/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_INVESTIGACION.PROYECTOS_LIST,
        loadChildren: () =>
          import('@modulespublic/investigacion/proyectos/proyectos.module').then((m) => m.ProyectosModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_PUBLICACIONES.ARTICULOS_LIST,
        loadChildren: () =>
          import('@modulespublic/publicaciones/articulos/articulos.module').then((m) => m.ArticulosModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_PUBLICACIONES.LIBROS_LIST,
        loadChildren: () =>
          import('@modulespublic/publicaciones/libros/libros.module').then((m) => m.LibrosModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_PUBLICACIONES.PINTELECTUALES_LIST,
        loadChildren: () =>
          import('@modulespublic/publicaciones/p-intelectuales/p-intelectuales.module').then((m) => m.PIntelectualesModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_PUBLICACIONES.TESIS_LIST,
        loadChildren: () =>
          import('@modulespublic/publicaciones/tesis/tesis.module').then((m) => m.TesisModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_PUBLICACIONES.CONGRESOS_LIST,
        loadChildren: () =>
          import('@modulespublic/publicaciones/congresos/congresos.module').then((m) => m.CongresosModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_MIEMBROS_LIST,
        loadChildren: () =>
          import('@modulespublic/miembros/miembros.module').then((m) => m.MiembrosModule),
      },
      {
        path: INTERNAL_PATHS.PUBLIC_NOSOTROS_LIST,
        loadChildren: () =>
          import('@modulespublic/nosotros/nosotros.module').then((m) => m.NosotrosModule),
      }
    ]
  },
  {
    path: INTERNAL_PATHS.PANEL_DEFAULT,
    component: SkeletonComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: INTERNAL_PATHS.PANEL_MI_CUENTA,
        loadChildren: () =>
        import('@modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_INVESTIGACION.PROYECTO_LIST,
        loadChildren: () =>
        import('@modules/investigacion/proyecto/proyecto.module').then((m) => m.ProyectoModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_PUBLICACIONES.ARTICULO_LIST,
        loadChildren: () =>
        import('@modules/publicaciones/articulo/articulo.module').then((m) => m.ArticuloModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_PUBLICACIONES.LIBRO_LIST,
        loadChildren: () =>
        import('@modules/publicaciones/libro/libro.module').then((m) => m.LibroModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_PUBLICACIONES.PINTELECTUAL_LIST,
        loadChildren: () =>
        import('@modules/publicaciones/p-intelectual/p-intelectual.module').then((m) => m.PIntelectualModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_PUBLICACIONES.TESIS_LIST,
        loadChildren: () =>
        import('@modules/publicaciones/tesis/tesis.module').then((m) => m.TesisModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_PUBLICACIONES.CONGRESO_LIST,
        loadChildren: () =>
        import('@modules/publicaciones/congreso/congreso.module').then((m) => m.CongresoModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_CAROUSEL_LIST,
        loadChildren: () =>
        import('@modules/carousel/carousel.module').then((m) => m.CarouselModule),
      },
      {
        path: INTERNAL_PATHS.PANEL_MIEMBRO_LIST,
        loadChildren: () =>
        import('@modules/miembro/miembro.module').then((m) => m.MiembroModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: INTERNAL_ROUTES.PUBLIC_HOME,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
