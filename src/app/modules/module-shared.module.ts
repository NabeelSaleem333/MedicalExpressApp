import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';

import { StoreComponent } from './store/store.component';
import { MedicineComponent } from './medicine/medicine.component';
import { VisitComponent } from './store/visit/visit.component';
import { MatsharedModule } from './matshared.module';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { MedicineonstoreComponent } from './medicine/medicineonstore/medicineonstore.component';
import { CartMedicinesComponent } from './cart/cart-medicines/cart-medicines.component';
import { OrderbillModule } from './cart/cart-medicines/orderbill/orderbill.module';
import { OrderbillComponent } from './cart/cart-medicines/orderbill/orderbill.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistoryComponent } from './history/history.component';
import { CharityComponent } from './charity/charity.component';

@NgModule({
  declarations: [
    StoreComponent,
    VisitComponent,
    OrderComponent,
    MedicineComponent,
    MedicineonstoreComponent,
    CartComponent,
    CartMedicinesComponent,
    CharityComponent,
    HistoryComponent,
    UserSettingsComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    MatsharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    OrderbillModule,
  ],
  entryComponents: [OrderComponent, OrderbillComponent],
})
export class ModuleSharedModule {}
