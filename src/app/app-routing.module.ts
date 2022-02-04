import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => 
      import ('@modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'panel',
    component: SkeletonComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('@modules/user/user.module').then((m) => m.UserModule),
      },
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
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
