import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OnlyCustomerUsersGuard } from './customer-user-guard';
import { CustomerCustomizeDiaryComponent } from './customer-customize-diary/customize-diary.component';
import { OrdersComponent } from '../shared/orders/orders.component';

const routes: Routes = [{
  path: '',
  canActivate: [OnlyCustomerUsersGuard],
  children: [{
    path: '',
    component: CustomerCustomizeDiaryComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }