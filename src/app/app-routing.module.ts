import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { SkeletonpublicComponent } from '@layoutpublic/skeletonpublic/skeletonpublic.component';
import { Page0Component } from '@modules/server/page0/page0.component';
import { Page401Component } from '@modules/server/page401/page401.component';
import { Page404Component } from '@modules/server/page404/page404.component';
import { Page500Component } from '@modules/server/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/home',
    pathMatch: 'full'
  },
  {
    path: 'error'+INTERNAL_ROUTES.SERVER_E_404,
    component: Page404Component
  },
  {
    path: 'error'+INTERNAL_ROUTES.SERVER_E_0,
    component: Page0Component
  },
  {
    path: 'error'+INTERNAL_ROUTES.SERVER_E_401,
    component: Page401Component
  },
  {
    path: 'error'+INTERNAL_ROUTES.SERVER_E_500,
    component: Page500Component
  },
  {
    path: 'auth',
    loadChildren: () => 
      import ('@modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'public',
    component: SkeletonpublicComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modulespublic/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'miembros',
        loadChildren: () =>
          import('@modulespublic/miembros/miembros.module').then((m) => m.MiembrosModule),
      },
      {
        path: 'proyectos',
        loadChildren: () =>
          import('@modulespublic/proyectos/proyectos.module').then((m) => m.ProyectosModule),
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('@modulespublic/noticias/noticias.module').then((m) => m.NoticiasModule),
      },
      {
        path: 'nosotros',
        loadChildren: () =>
          import('@modulespublic/nosotros/nosotros.module').then((m) => m.NosotrosModule),
      }
    ]
  },
  {
    path: 'panel',
    component: SkeletonComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cuenta',
        loadChildren: () =>
        import('@modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'categoria',
        loadChildren: () =>
        import('@modules/categoria/categoria.module').then((m) => m.CategoriaModule),
      },
      {
        path: 'contenido',
        loadChildren: () =>
        import('@modules/contenido/contenido.module').then((m) => m.ContenidoModule),
      },
      {
        path: 'miembro',
        loadChildren: () =>
        import('@modules/miembro/miembro.module').then((m) => m.MiembroModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'public/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
