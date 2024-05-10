import { Component,OnDestroy } from '@angular/core';
import {RegisterService} from "../../services/register-service/register.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from "../../model/user-entity/user.entity";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    NgStyle,
    MatIconButton
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