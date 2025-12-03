import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, FormsModule], // RouterLink removido
})
export class CadastroComponent implements OnInit {

  nome: string = '';
  cpf: string = '';
  nascimento: string = '';
  lgpdAceito: boolean = false;

  erro: string = '';
  sucesso: string = '';
  usuarioLogado: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Mantém o usuário logado se estiver salvo
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuarioLogado = JSON.parse(usuarioStr);
    }
  }

  limitarCPF() {
    if (this.cpf.length > 11) {
      this.cpf = this.cpf.slice(0, 11);
    }
    this.erro = '';
  }

  registrar(form: NgForm) {
    this.erro = '';
    this.sucesso = '';

    if (!form.valid || !this.lgpdAceito) {
      this.erro = 'Preencha todos os campos e aceite a LGPD.';
      return;
    }

    const usuario = {
      nome: this.nome,
      cpf: this.cpf,
      nascimento: this.nascimento
    };

    this.authService.cadastrarUsuario(usuario).subscribe({
      next: (res: any) => {
        this.sucesso = res.mensagem;
        this.usuarioLogado = res.usuario;

        localStorage.setItem('usuario', JSON.stringify(res.usuario));

        // reset do formulário
        form.resetForm({
          nome: '',
          cpf: '',
          nascimento: '',
          lgpdAceito: false
        });
      },
      error: (err: any) => {
        if (err.status === 409) {
          this.erro = 'Este CPF já está cadastrado.';
        } else if (err.status === 400) {
          this.erro = 'Preencha todos os campos.';
        } else {
          this.erro = 'Erro ao cadastrar.';
        }
      }
    });
  }

  sair() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario');
  }
}
