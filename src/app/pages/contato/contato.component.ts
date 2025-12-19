import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {

  
  numeroWhatsApp = '5571999616997';

  form = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  };

  enviarFormulario() {
    const texto = `
*Novo contato pelo site*

Nome: ${this.form.nome}
Email: ${this.form.email}
Telefone: ${this.form.telefone}

Mensagem:
${this.form.mensagem}
    `;

    const url = `https://wa.me/${this.numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  }
}
