import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3002'; // ➜ coloque aqui sua URL da API

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, usuario);
  }

  login(cpf: string, nascimento: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, nascimento });
  }
}
