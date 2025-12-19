import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = 'http://localhost:3002/img';

  // Imagem da professora
  professora = `${this.apiUrl}/img.prof.jpeg`;

  // Listar todas as imagens do carrossel
  carrosselImagens: string[] = [
    '6.jpeg', '7.jpeg', '11.jpeg', '13.jpeg', '16.jpeg', '18.jpeg',
    '19.jpeg', '21.jpeg', '23.jpeg', '24.jpeg', '25.jpeg', '26.jpeg',
    '27.jpeg', '28.jpeg', '30.jpeg', '31.jpeg', '33.jpeg', '38.jpeg',
    '39.jpeg', 'img 3.jpeg', 'img 4.jpeg', 'img 5.jpeg'
  ].map(img => `${this.apiUrl}/${img}`);

  constructor() { }
}
