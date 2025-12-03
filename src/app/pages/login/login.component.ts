import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent implements OnInit {

  cpf: string = '';
  nascimento: string = '';
  erro: string = '';
  usuarioLogado: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
    }
  }

  limitarCPF() {
    if (this.cpf.length > 11) {
      this.cpf = this.cpf.slice(0, 11);
    }
    this.erro = '';
  }

  fazerLogin() {
    this.erro = '';

    this.authService.login(this.cpf, this.nascimento).subscribe({
      next: (usuario: any) => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuarioLogado = usuario;
      },
      error: () => {
        this.erro = 'CPF ou data de nascimento incorretos.';
      }
    });
  }

  sair() {
    localStorage.removeItem('usuario');
    this.usuarioLogado = null;
    this.cpf = '';
    this.nascimento = '';
  }
}
