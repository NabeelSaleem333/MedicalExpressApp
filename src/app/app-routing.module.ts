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
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { StoreinfoComponent } from './modules/dashboard/mystore/storeinfo/storeinfo.component';
import { OrderdetailComponent } from './modules/dashboard/mystore/orders/orderdetail/orderdetail.component';
import { HistoryComponent } from './modules/history/history.component';
import { CharityComponent } from './modules/charity/charity.component';


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
        path: 'storeinfo/:id',
        component: StoreinfoComponent,
      },
      {
        path: 'inventory/:name/:id',
        component: InventoryComponent,
      },
    ],
  },
  {
    path: 'orders/orderdetail/:id',
    component: OrderdetailComponent,
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
    path: 'charity',
    component: CharityComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'login',
    canActivate: [RedirectLoginGuard],
    component: AuthComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
  },
  {
    path: 'signup',
    canActivate: [RedirectLoginGuard],
    component: AuthComponent,
  },
  {
    path: 'Contact Us',
    component: ContactUsComponent,
  },
  {
    path: 'About Us',
    component: AboutUsComponent,
  },
  {
    path: 'tab-bar',
    loadChildren: () => import('./modules/tab-bar/tab-bar.module').then( m => m.TabBarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
