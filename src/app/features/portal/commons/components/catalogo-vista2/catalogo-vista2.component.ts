import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo-vista2',

  templateUrl: './catalogo-vista2.component.html',
  styleUrl: './catalogo-vista2.component.scss',
})
export class CatalogoVista2Component {
  products = [
    { imageUrl: 'https://res.cloudinary.com/dfd0b4jhf/image/upload/v1709408635/seccion_categoria/gfmiobjwk6gleki0qkkh.webp', category: 'Reposteria' },
    { imageUrl: 'https://res.cloudinary.com/dfd0b4jhf/image/upload/v1709409470/seccion_categoria/wlvorjomjxwty2tm3lan.jpg', category: 'Panaderia' },
    { imageUrl: 'https://static.wixstatic.com/media/64de7c_81dfcb2065ab41be83b3e7b79706fe34~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_81dfcb2065ab41be83b3e7b79706fe34~mv2.jpg', category: 'Pasteles de Celebracion' },
    { imageUrl: 'https://res.cloudinary.com/dfd0b4jhf/image/upload/v1709408635/seccion_categoria/l639eyjpppzedrmu9yaa.webp', category: 'Pasteles de Boda' },
    { imageUrl: 'https://res.cloudinary.com/dfd0b4jhf/image/upload/v1709409626/seccion_categoria/vgozisjnmxj5zldgt7hu.jpg', category: 'Pasteles de Finos' },
    // Añade más productos según sea necesario
  ];
}
