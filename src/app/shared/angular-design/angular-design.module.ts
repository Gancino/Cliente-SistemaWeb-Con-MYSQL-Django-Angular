import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'; 
import { CustomMatPaginatorIntl } from './paginator-es';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from './custom-state-matcher';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 

@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  exports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorStateMatcher
    }
  ]
})
export class AngularDesignModule { }
