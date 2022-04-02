import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromComponents from './components';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDesignModule } from './angular-design/angular-design.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    //bootstrap
    NgbModule,
    //AngularMaterial
    AngularDesignModule
  ],
  declarations: [...fromComponents.components],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AngularDesignModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
