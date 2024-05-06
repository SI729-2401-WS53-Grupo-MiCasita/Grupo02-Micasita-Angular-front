import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-estates-voucher',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    RouterLink
  ],
  templateUrl: './estates-voucher.component.html',
  styleUrl: './estates-voucher.component.css'
})
export class EstatesVoucherComponent {

}
