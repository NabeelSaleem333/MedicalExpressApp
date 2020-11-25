import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreatestoreComponent } from '../dashboard/mystore/createstore/createstore.component';
import { createComponent } from '@angular/compiler/src/core';

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule
  ],
  exports: []
})
export class SpecificModule {}
