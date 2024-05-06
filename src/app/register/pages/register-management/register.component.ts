import { Component,OnDestroy } from '@angular/core';
import {RegisterService} from "../../services/register-service/register.service";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from "../../model/user-entity/user.entity";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  userData: User = new User();
  private registrationSubscription: Subscription | undefined;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submitForm(formData: any) {
    delete this.userData.id;
    this.registrationSubscription = this.registerService.create(this.userData).subscribe({
      next: (response) => {
        this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/estates-list']);
      },
      error: (error) => {
        this.snackBar.open('Error al registrar usuario: ' + error.message, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
