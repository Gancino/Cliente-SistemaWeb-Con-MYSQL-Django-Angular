import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '@core/guards/no-auth.guard';
import { INTERNAL_PATHS } from '@data/constants/routes';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
    {
        path: INTERNAL_PATHS.AUTH_LOGIN,
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}