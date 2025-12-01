import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cpf = '';
  nascimento = '';
  erro = '';
  usuarioLogado: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    /** Carrega usuário salvo no LocalStorage */
    this.usuarioLogado = this.api.getUsuarioLogado();
  }

  fazerLogin() {
    this.erro = '';

    this.api.login(this.cpf, this.nascimento).subscribe({
      next: (usuario: any) => {
        this.usuarioLogado = usuario;
      },
      error: () => {
        this.erro = "CPF ou data de nascimento incorretos";
      }
    });
  }

  sair() {
    this.api.logout();
    this.usuarioLogado = null;
  }

  /** LIMITA CPF PARA 11 DÍGITOS */
  limitarCPF() {
    this.cpf = this.cpf.replace(/[^0-9]/g, '').slice(0, 11);
  }
}
