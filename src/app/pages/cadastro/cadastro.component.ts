import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  nome = '';
  cpf = '';
  nascimento = '';
  erro = '';
  sucesso = '';

  constructor(private api: ApiService) {}

  registrar() {
    this.erro = '';
    this.sucesso = '';

    this.api.cadastrarUsuario({
      nome: this.nome,
      cpf: this.cpf,
      nascimento: this.nascimento
    }).subscribe({
      next: () => {
        this.sucesso = "Usuário cadastrado com sucesso!";
      },
      error: () => {
        this.erro = "Erro ao cadastrar. Verifique os dados.";
      }
    });
  }

  limitarCPF() {
    this.cpf = this.cpf.replace(/[^0-9]/g, '').slice(0, 11);
  }
}
