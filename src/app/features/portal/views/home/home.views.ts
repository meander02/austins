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
  filteredProducts: Product[] = []; // Almacena los productos filtrados para la búsqueda
  hasSearchResults = true;
  filterPost = '';
  items: number = 0;
  productsLoaded: boolean = false; // Variable para indicar si los productos se han cargado o no
  loadingProducts = true; // Variable para indicar si los productos se están cargando

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
    this.searchService.searchQuery$.subscribe((query) => {
      this.filterPost = query;
      this.filterProducts(query);
    });

    this.productService.getAll().subscribe(
      (response) => {
        this.originalProducts = response;
        this.loadingProducts = false; // Establece loadingProducts en false una vez que los productos se han cargado
        this.filterProducts(this.filterPost); // Filtra los productos basados en la búsqueda actual
      },
      (error) => {
        console.log('Error al cargar productos', error);
        this.loadingProducts = false; // Si hay un error al cargar los productos, establece loadingProducts en false
      }
    );
  }
  filterProducts(query: string): void {
    if (query.trim() !== '') {
      this.filteredProducts = this.originalProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.originalProducts];
    }
    this.hasSearchResults = this.filteredProducts.length > 0;
  }

    // Método para generar items de esqueleto
    get skeletonItems(): any[] {
      const skeletonItemCount = 4; // Definir la cantidad de items de esqueleto que deseas mostrar
      return Array(skeletonItemCount).fill(null);
    }
}
