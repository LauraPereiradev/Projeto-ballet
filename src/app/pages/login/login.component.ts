import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
limitarCPF() {
throw new Error('Method not implemented.');
}
enviarWhatsApp() {
throw new Error('Method not implemented.');
}

  cpf = '';
  nascimento = '';
  erro = '';

  usuarioLogado: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Mantém logado ao voltar para a tela
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuarioLogado = JSON.parse(usuarioStr);
    }
  }

  fazerLogin() {
    if (!this.cpf || !this.nascimento) {
      this.erro = 'Preencha CPF e data de nascimento';
      return;
    }

    this.authService.login(this.cpf, this.nascimento).subscribe({
      next: (res: any) => {

        this.usuarioLogado = {
          nome: res?.usuario?.nome || 'Usuário Logado',
          cpf: this.cpf,
          nascimento: this.nascimento
        };

        // Salva o usuário
        localStorage.setItem('usuario', JSON.stringify(this.usuarioLogado));

        this.erro = '';
      },
      error: () => {
        this.erro = 'CPF ou data de nascimento inválidos';
      }
    });
  }

  sair() {
    this.authService.logout();
    localStorage.removeItem('usuario');
    this.usuarioLogado = null;
  }
}
