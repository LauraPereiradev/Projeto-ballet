import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  login(cpf: string, nascimento: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      cpf,
      nascimento
    }).pipe(
      tap((usuario) => {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      })
    );
  }

  cadastrarUsuario(usuario: any) {
    return this.http.post<any>(`${this.apiUrl}/cadastro`, usuario);
  }

  getUsuarioLogado() {
    const data = localStorage.getItem('usuarioLogado');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
  }
}
