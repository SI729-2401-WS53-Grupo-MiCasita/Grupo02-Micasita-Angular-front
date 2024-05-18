import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {EstatesListComponent} from "./register/components/estates-list/estates-list.component";
import {EstateDetailsComponent} from "./register/components/estate-details/estate-details.component";
import {EstatesPaymentComponent} from "./register/components/estates-payment/estates-payment.component";
import {EstatesVoucherComponent} from "./register/components/estates-voucher/estates-voucher.component";
import { RegisterPageComponent } from './register/pages/register-page/register-page.component';

export const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'estates', component: EstatesListComponent },
  { path: 'estate/:id', component: EstateDetailsComponent },
  { path: 'estates/payment/:id', component: EstatesPaymentComponent },
  {path: 'estates/voucher/:id', component:EstatesVoucherComponent},
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
