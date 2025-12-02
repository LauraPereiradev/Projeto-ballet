import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {

  cpf: string = '';
  nascimento: string = '';
  erro: string = '';
  usuarioLogado: any = null;

  constructor(private router: Router) {}

  limitarCPF() {
    if (this.cpf.length > 11) {
      this.cpf = this.cpf.slice(0, 11);
    }
  }

  fazerLogin() {
    this.erro = '';

    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      this.erro = 'Nenhum usuário cadastrado.';
      return;
    }

    const dados = JSON.parse(usuario);

    if (dados.cpf === this.cpf && dados.nascimento === this.nascimento) {
      this.usuarioLogado = dados;
    } else {
      this.erro = 'CPF ou data de nascimento incorretos.';
    }
  }

  sair() {
    this.usuarioLogado = null;
    this.cpf = '';
    this.nascimento = '';
  }
}
