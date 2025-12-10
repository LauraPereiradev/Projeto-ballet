import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit, OnDestroy {

  imagens: string[] = [
    '6.jpg',
    '7.jpg',
    '11.jpg',
    '13.jpg',
    '16.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg',
    '21.jpg',
    '23.jpg',
    '24.jpg',
    '25.jpg',
    '26.jpg',
    '27.jpg',
    '28.jpg',
    '30.jpg',
    '31.jpg',
    '33.jpg',
    '38.jpg',
    '39.jpg',
    'img3,jpg',
    'img4.jpg',
    'img5.jpg'];


  imagemAtual = 0;
  intervalo: any;

  ngOnInit() {
    this.iniciarCarrosselAutomatico();
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarCarrosselAutomatico() {
    this.intervalo = setInterval(() => {
      this.proximaImagem();
    }, 3000);
  }

  proximaImagem() {
    this.imagemAtual = (this.imagemAtual + 1) % this.imagens.length;
  }

  imagemAnterior() {
    this.imagemAtual =
      (this.imagemAtual - 1 + this.imagens.length) % this.imagens.length;
  }
}

   