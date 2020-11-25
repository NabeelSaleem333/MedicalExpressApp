import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CreatestoreComponent } from '../modules/dashboard/mystore/createstore/createstore.component';
import { DashboardModule } from '../modules/dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DashboardModule
  ],
  entryComponents: [ CreatestoreComponent ],
  declarations: [HomePage]
})
export class HomePageModule {}
