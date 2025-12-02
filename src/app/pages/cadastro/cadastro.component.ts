import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CadastroComponent {

  nome: string = '';
  cpf: string = '';
  nascimento: string = '';
  lgpdAceito: boolean = false;

  erro: string = '';
  sucesso: string = '';

  limitarCPF() {
    if (this.cpf.length > 11) {
      this.cpf = this.cpf.slice(0, 11);
    }
  }

  registrar(form: NgForm) {

    this.erro = '';
    this.sucesso = '';

    if (!form.valid) {
      this.erro = 'Preencha todos os campos corretamente.';
      return;
    }

    if (!this.lgpdAceito) {
      this.erro = 'Você precisa aceitar os termos da LGPD.';
      return;
    }

    const usuario = {
      nome: this.nome,
      cpf: this.cpf,
      nascimento: this.nascimento
    };

    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.sucesso = 'Cadastro realizado com sucesso!';

    form.resetForm({
      nome: '',
      cpf: '',
      nascimento: '',
      lgpdAceito: false
    });
  }
}
