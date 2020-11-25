import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './modules/store/store.component';
import { MedicineComponent } from './modules/medicine/medicine.component';
import { VisitComponent } from './modules/store/visit/visit.component';
import { CartComponent } from './modules/cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { IsLoginGuard } from './core/customs/guards/isLogin.guard';
import { RedirectLoginGuard } from './core/customs/guards/redirectLogin.guard';
import { MedicineonstoreComponent } from './modules/medicine/medicineonstore/medicineonstore.component';
import { MystoreComponent } from './modules/dashboard/mystore/mystore.component';
import { InventoryComponent } from './modules/dashboard/mystore/inventory/inventory.component';
import { OrdersComponent } from './modules/dashboard/mystore/orders/orders.component';
import { OrdertypeComponent } from './modules/dashboard/mystore/orders/ordertype/ordertype.component';
import { CartMedicinesComponent } from './modules/cart/cart-medicines/cart-medicines.component';
import { UserSettingsComponent } from './modules/user/user-settings/user-settings.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'user/settings',
    children: [{
      path: '',
      component: UserSettingsComponent,
    }],
  },
  { path: 'stores',
    children: [
      {
        path: '',
        component: StoreComponent,
      },
      {
        path: 'visit/:id',
        component: VisitComponent,
      },
    ],
  },
  {
    path: 'medicines',
    children: [
      {
        path: '',
        component: MedicineComponent,
      },
      {
        path: 'on/:id',
        component: MedicineonstoreComponent,
      },
    ],
  },
  {
    path: 'dashboard/mystore',
    canActivate: [IsLoginGuard],
    children: [
      {
        path: '',
        component: MystoreComponent,
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrdersComponent,
          },
          {
            path: ':storeId',
            component: OrdertypeComponent,
          },
        ],
      },
      {
        path: 'inventory/:name/:id',
        component: InventoryComponent,
      },
    ],
  },
  {
    path: 'cart',
    canActivate: [IsLoginGuard],
    children: [
      {
        path: '',
        component: CartComponent,
      }, {
        path: ':storename/:storeId',
        component: CartMedicinesComponent
      }
    ],
  },
  {
    path: 'login',
    canActivate: [RedirectLoginGuard],
    component: AuthComponent,
  },
  {
    path: 'signup',
    canActivate: [RedirectLoginGuard],
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
