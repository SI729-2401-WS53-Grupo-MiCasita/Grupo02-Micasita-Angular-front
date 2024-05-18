// app.component.ts
import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterOutlet} from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import {AuthService} from "./register/services/authentication/authentication.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    MatButton,
    NgIf
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showButtons = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => this.checkAuthenticationStatus())
    ).subscribe();
  }

  checkAuthenticationStatus() {
    this.authService.auth$.subscribe(authenticated => {
      this.isLoggedIn = authenticated;
      this.showButtons =authenticated || window.location.pathname!== '/register';
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/register']); // Redirige a la página de registro después de cerrar sesión
  }
}
