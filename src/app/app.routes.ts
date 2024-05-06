import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { RegisterComponent} from "./register/pages/register-management/register.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {EstatesListComponent} from "./register/components/estates-list/estates-list.component";
import {EstateDetailsComponent} from "./register/components/estate-details/estate-details.component";
import{EstatesPaymentComponent} from "./register/components/estates-payment/estates-payment.component";
import {EstatesVoucherComponent} from "./register/components/estates-voucher/estates-voucher.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'estates-list', component: EstatesListComponent },
  { path: 'estate/:id', component: EstateDetailsComponent },
  {path: 'estates-payment', component:EstatesPaymentComponent},
  {path: 'estates-voucher', component:EstatesVoucherComponent},
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
