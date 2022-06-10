import { NgModule } from '@angular/core';
import { PIntelectualComponent } from './p-intelectual/p-intelectual.component';
import { ShowPIntComponent } from './p-intelectual/show-p-int/show-p-int.component';
import { AddEditPIntComponent } from './p-intelectual/add-edit-p-int/add-edit-p-int.component';
import { SharedModule } from '@shared/shared.module';
import { PIntelectualRoutingModule } from './p-intelectual-routing.module';

@NgModule({
  declarations: [
    PIntelectualComponent,
    ShowPIntComponent,
    AddEditPIntComponent
  ],
  imports: [
    SharedModule,
    PIntelectualRoutingModule
  ]
})
export class PIntelectualModule { }
