import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent }  from './customer.component';
import { OnlyCustomerUsersGuard } from './customer-user-guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatGridListModule } from '@angular/material'
import { MatCardModule } from '@angular/material'
import { SharedModule } from '../shared/shared.module';
import { DialogboxComponent } from './checkout/dialogbox/dialogbox.component';
import { CustomerCustomizeDiaryComponent } from './customer-customize-diary/customize-diary.component';



@NgModule({
  declarations: [
    CustomerComponent,
    CheckoutComponent,
    DialogboxComponent,
    CustomerCustomizeDiaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [
    OnlyCustomerUsersGuard
  ]})
export class CustomerModule {}
