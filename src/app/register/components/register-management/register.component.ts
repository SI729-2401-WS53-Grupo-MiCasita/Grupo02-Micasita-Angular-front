import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import { User } from "../../model/user-entity/user.entity";
import { RegisterService } from "../../services/register-service/register.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  isRegisterMode = false;

  constructor(private authService: RegisterService) {}

  toggleMode() {
    this.isRegisterMode =!this.isRegisterMode;
  }

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: () => {
        console.log('Registro exitoso');
      },
      error: (error) => {
        console.error('Error durante el registro:', error);
      }
    });
  }

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: () => {
        console.log('Inicio de sesión exitoso');
      },
      error: (error) => {
        console.error('Error durante el inicio de sesión:', error);
      }
    });
  }
}
