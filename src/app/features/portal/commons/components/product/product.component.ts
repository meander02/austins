import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/services/search-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit {
  hasSearchResults = true;

  constructor(
    private router: Router,
    private searchService: SearchService, // Inyecta el servicio de búsqueda

  ) {}
  filterPost = '';
  products = [
    {
      name: "Tarta de Chocolate",
      description: "Deliciosa tarta de chocolate",
      quantity: "10",
      price: 15.99,
      images: ["image1.jpg", "image2.jpg"],
      // Otras propiedades del producto
    },
    {
      name: "Galletas de Avena y Pasas",
      description: "Galletas saludables con avena y pasas",
      quantity: "20",
      price: 9.99,
      images: ["galleta1.jpg", "galleta2.jpg"],
      // Otras propiedades del producto
    },
    {
      name: "Pastel de Fresa",
      description: "Pastel fresco de fresa con crema batida",
      quantity: "8",
      price: 24.99,
      images: ["pastel1.jpg", "pastel2.jpg"],
      // Otras propiedades del producto
    },
    {
      name: "Brownie de Chocolate",
      description: "Delicioso brownie de chocolate negro",
      quantity: "15",
      price: 6.99,
      images: ["brownie1.jpg", "brownie2.jpg"],
      // Otras propiedades del producto
    }
  ];

  // ngOnInit(): void {
  //   // Suscríbete al observable para recibir notificaciones de cambios en la búsqueda.
  //   this.searchService.searchQuery$.subscribe((query) => {
  //     // Filtra los productos en función de la consulta de búsqueda (query).
  //     this.filterPost = query;
  //   });
  // }

  ngOnInit(): void {
    // Suscríbete al observable para recibir notificaciones de cambios en la búsqueda.
    this.searchService.searchQuery$.subscribe((query) => {
      // Filtra los productos en función de la consulta de búsqueda (query).
      this.filterPost = query;

      // Verifica si se han encontrado resultados.
      this.hasSearchResults = this.products.some((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    });

  }



  add(): void {
    // this.cartService.add(this.cartItem);
  }

  increment(): void {
    // this.cartService.add(this.cartItem);
  }

  decrement(): void {
    // this.cartService.remove(this.cartItem);
  }

  goToDetail(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
