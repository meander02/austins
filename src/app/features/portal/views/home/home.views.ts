import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/features/admin/commons/services/product.service';
import { Product } from 'src/app/features/admin/models/Product.models';
import { SearchService } from 'src/app/shared/services/search-service.service';
// import 'aos/dist/aos.css';
// import * as AOS from 'aos';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: [
    './home.views.scss',
    './product.scss',
    './hom.scss',
    './anima.scss'
  ]
})
export class HomeViews implements OnInit {

  responsiveOptions: any[] | undefined;
  // autoplayInterval: number = 3000;
  autoplayInterval: number = 6000;

  originalProducts: Product[] = []; // Mantén una copia original de todos los productos
  filteredProducts: Product[] = []; // Almacena los productos filtrados para la búsqueda
  hasSearchResults = true;
  filterPost = '';
  items: number = 0;
  // productsLoaded: boolean = false; // Variable para indicar si los productos se han cargado o no
  loadingProducts = true; // Variable para indicar si los productos se están cargando
  isMobile: boolean = false; // Variable para verificar si es una pantalla móvil

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


    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

     // Verificar el tamaño de la pantalla al cargar el componente
     this.checkScreenSize();
    //  AOS.init();
    //  window.addEventListener('load',AOS.refresh)
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

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();

  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 500;

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
