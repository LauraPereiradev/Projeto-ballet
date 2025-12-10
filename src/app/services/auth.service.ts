import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3002'; // URL da API

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }

  login(cpf: string, nascimento: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, nascimento }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('userToken', res.token); // salva token no login
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); // checa se há token
  }
}
