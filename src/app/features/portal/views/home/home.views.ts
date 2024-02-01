import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/features/admin/commons/services/product.service';
import { Product } from 'src/app/features/admin/models/Product.models';
import { SearchService } from 'src/app/shared/services/search-service.service';
// import 'aos/dist/aos.css';
// import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: [
    './home.views.scss',
    './hom.scss'
  ]
})
export class HomeViews implements OnInit {
  originalProducts: Product[] = []; // Mantén una copia original de todos los productos
  products: Product[] = [];
  hasSearchResults = true;
  filterPost = '';
  items: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    cursor.style.left = (event.clientX - 10) + 'px';
    cursor.style.top = (event.clientY - 10) + 'px';
  }

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }

  ngOnInit(): void {

    // AOS.init();
    // below listed default settings


    this.searchService.searchQuery$.subscribe((query) => {
      // Almacena la consulta de búsqueda.
      this.filterPost = query;

      // Actualiza los productos basados en la consulta de búsqueda o muestra todos los productos.
      if (query.trim() !== '') {
        this.products = this.originalProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        this.products = [...this.originalProducts]; // Si la búsqueda está vacía, muestra todos los productos originales.
      }

      // Verifica si se han encontrado resultados.
      this.hasSearchResults = this.products.length > 0;

      // console.log('products', query);
      // console.log('products', this.products);
    });

    this.productService.getAll().subscribe(
      (response) => {
        this.originalProducts = response; // Almacena todos los productos originales.
        this.products = [...this.originalProducts]; // Muestra todos los productos al inicio.
      },
      (error) => {
        console.log('Error al cargar productos', error);
      }
    );
  }
}
