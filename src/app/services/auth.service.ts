
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }

  login(cpf: string, nascimento: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, nascimento }).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('userToken', res.token);
        }

      
        if (res?.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('usuario');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  getUsuario() {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
}
