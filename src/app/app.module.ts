import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftNavMenuComponent } from './layout/left-nav/left-nav-menu/left-nav-menu.component';
import { SkeletonpublicComponent } from './layoutpublic/skeletonpublic/skeletonpublic.component';
import { FooterpublicComponent } from './layoutpublic/footerpublic/footerpublic.component';
import { NavigationpublicComponent } from './layoutpublic/navigationpublic/navigationpublic.component';
import { Page404Component } from './modules/server/page404/page404.component';
import { Page0Component } from './modules/server/page0/page0.component';
import { Page401Component } from './modules/server/page401/page401.component';
import { Page500Component } from './modules/server/page500/page500.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    LeftNavComponent,
    HeaderComponent,
    LeftNavMenuComponent,
    SkeletonpublicComponent,
    FooterpublicComponent,
    NavigationpublicComponent,
    Page404Component,
    Page0Component,
    Page401Component,
    Page500Component,
  ],
  imports: [
    BrowserModule,
    //Core
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
