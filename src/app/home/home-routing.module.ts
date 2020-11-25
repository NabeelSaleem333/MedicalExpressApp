import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SpecificModule } from '../modules/user/specific.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  SpecificModule],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
