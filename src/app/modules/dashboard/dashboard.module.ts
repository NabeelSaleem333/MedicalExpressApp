import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MystoreComponent } from './mystore/mystore.component';
import { CreatestoreComponent } from './mystore/createstore/createstore.component';
import { InfoComponent } from './mystore/info/info.component';
import { InventoryComponent } from './mystore/inventory/inventory.component';
import { AddmedicineComponent } from './mystore/inventory/addmedicine/addmedicine.component';
import { MedicineinfoComponent } from './mystore/inventory/medicineinfo/medicineinfo.component';
import { MedicineonstoreComponent } from '../medicine/medicineonstore/medicineonstore.component';
import { OrdersComponent } from './mystore/orders/orders.component';
import { OrdertypeComponent } from './mystore/orders/ordertype/ordertype.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreinfoComponent } from './mystore/storeinfo/storeinfo.component';
import { OrderdetailComponent } from './mystore/orders/orderdetail/orderdetail.component';

@NgModule({
  declarations: [
    MystoreComponent,
    CreatestoreComponent,
    StoreinfoComponent,
    InfoComponent,
    InventoryComponent,
    AddmedicineComponent,
    MedicineinfoComponent,
    OrdersComponent,
    OrdertypeComponent,
    OrderdetailComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule,
    Ng2SearchPipeModule],
  exports: [],
  entryComponents: [
    CreatestoreComponent,
    InfoComponent,
    AddmedicineComponent,
    MedicineinfoComponent
  ],
})
export class DashboardModule {}
