import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [MatMenuModule, MatToolbarModule, MatIconModule, MatSnackBarModule],
  exports: [MatMenuModule, MatToolbarModule, MatIconModule, MatSnackBarModule]
})
export class MatsharedModule {}
