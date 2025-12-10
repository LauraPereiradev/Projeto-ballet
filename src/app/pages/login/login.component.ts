import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // <- caminho corrigido

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cpf = '';
  nascimento = '';
  erro = '';
  usuario = {
    nome: '',
    telefone: ''
  };
usuarioLogado: any;

  constructor(private authService: AuthService, private router: Router) {}

  limitarCPF() {
    this.cpf = this.cpf.replace(/\D/g, '').slice(0, 11);
  }

  fazerLogin() {
    if (!this.cpf || !this.nascimento) {
      this.erro = 'Preencha CPF e data de nascimento';
      return;
    }

    this.authService.login(this.cpf, this.nascimento).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
        }
        this.erro = '';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.erro = 'CPF ou data de nascimento inválidos';
      }
    });
  }

  sair() {
    this.authService.logout();
    this.cpf = '';
    this.nascimento = '';
    this.router.navigate(['/login']);
  }

  enviarWhatsApp() {
    const numero = '55999616997';
    const mensagem = `
Olá! Quero agendar uma aula 💗
Nome: ${this.usuario.nome}
Telefone: ${this.usuario.telefone}
CPF: ${this.cpf}
    `;
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  }
}
