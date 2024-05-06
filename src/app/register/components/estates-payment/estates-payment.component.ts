import { Component,OnDestroy } from '@angular/core';
import {PaymentService} from "../../services/payment-service/payment-service.service";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import {PaymentEntity} from "../../model/payment-entity/payment-entity.entity";
import {Estate} from "../../model/estate-entity/estate.entity";
import { Subscription } from 'rxjs';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-estates-payment',
  standalone: true,
  imports: [RouterLink, FormsModule, MatFormField],
  templateUrl: './estates-payment.component.html',
  styleUrl: './estates-payment.component.css'
})
export class EstatesPaymentComponent {
  paymentData:PaymentEntity = new PaymentEntity();
  private paymentSubscription: Subscription | undefined;

  constructor(
    private registerService: PaymentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submitForm(formData: any) {
    delete this.paymentData.id;
    this.paymentSubscription = this.registerService.create(this.paymentData).subscribe({
      next: (response) => {
        this.snackBar.open('Metodo de Pago Correcto', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/estates-list']);
      },
      error: (error) => {
        this.snackBar.open('Error al implementar el Metodo de Pago: ' + error.message, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }
}
