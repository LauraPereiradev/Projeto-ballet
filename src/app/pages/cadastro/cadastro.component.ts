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
  imports: [CommonModule, FormsModule],
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
    
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  limitarCPF() {
    this.cpf = this.cpf.replace(/\D/g, '').slice(0, 11);
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
        if (res.token) {
          
          localStorage.setItem('userToken', res.token);
        }

        this.sucesso = res.mensagem || 'Cadastro realizado com sucesso!';
        this.usuarioLogado = res.usuario;

        
        this.router.navigate(['/dashboard']);

        
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
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
