import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { SkeletonpublicComponent } from '@layoutpublic/skeletonpublic/skeletonpublic.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/home',
    //redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => 
      import ('@modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'public',
    component: SkeletonpublicComponent,
    //canActivate: [AuthGuard],
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
      /*
      {
        path: 'cuenta',
        loadChildren: () =>
        import('@modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
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
      */
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
    //redirectTo: 'auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
