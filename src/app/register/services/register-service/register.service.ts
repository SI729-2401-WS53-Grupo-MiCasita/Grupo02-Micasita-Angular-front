// register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { User } from "../../model/user-entity/user.entity";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private authSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación
  public auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {}

  login(user: User): Observable<any> {
    return this.http.get<User[]>('https://my-json-server.typicode.com/drkdevv1/db-server-demo/users')
        .pipe(
            map((users: any[]) => users.find(u => u.email === user.email && u.password === user.password)),
            tap((existingUser: any) => {
              if (existingUser) {
                this.authSubject.next(true); // Marcar como autenticado
                this.router.navigate(['/estates']);
              } else {
                alert('Usuario o contraseña incorrectos.');
              }
            })
        );
  }

  register(user: User): Observable<any> {
    return this.http.post<User>('https://my-json-server.typicode.com/drkdevv1/db-server-demo/users', user)
        .pipe(
            tap(newUser => {
              this.authSubject.next(true); // Marcar como autenticado
              this.router.navigate(['/estates']);
            }),
            catchError(error => {
              alert('Error al registrar usuario.');
              throw error;
            })
        );
  }

  logout() {
    this.authSubject.next(false);
  }
}
