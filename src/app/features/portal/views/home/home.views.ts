import { Component ,HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/features/admin/commons/services/product.service';
import { Product } from 'src/app/features/admin/models/Product.models';
import { SearchService } from 'src/app/shared/services/search-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: ['./home.views.scss']
})
export class HomeViews implements OnInit {


  products: Product[] = [];
  producto:Product;
  hasSearchResults = true;
  filterPost = '';
  items: number=0;
  constructor(private router: Router,private productService: ProductService, private searchService: SearchService) {
    this.producto = new Product();
    this.producto._id = "600b727a1a4be3a70c51e15c";
    this.producto.sku = "P003";
    this.producto.name = "Alcohol Medicinal 96°";
    this.producto.description = "Alcohol medicinal de 1 litro al 96% de pureza, ideal para desinfectar manos y ambientes.";
    this.producto.price = 12;
    this.producto.images = ["uploads/prevencion/600b727a1a4be3a70c51e15c/alcohol.png"];
  }
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    cursor.style.left = (event.clientX - 10) + 'px'; // Ajusta el offset según el tamaño de tu cursor
    cursor.style.top = (event.clientY - 10) + 'px';
  }

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }

  ngOnInit(): void {
    this.searchService.searchQuery$.subscribe((query) => {
      // Filtra los productos en función de la consulta de búsqueda (query).
      this.filterPost = query;
      // Verifica si se han encontrado resultados.
      this.hasSearchResults = this.producto.name.toLowerCase().includes(query.toLowerCase());
    });
    // console.log('Producto en el presentador', this.product);
    // console.log('primero', this.productService.getAll());
    this.productService.getAll()
    .subscribe(
      response => {
        this.products = response;
        console.log('products', this.products);
      },
      error =>{
        console.log(error);
        if (error.status === 404) { console.log('error 404')}
      }
    );
    console.log('segundo');
  }

  goToDetail(): void {
    // this.router.navigateByUrl(`portal/detail/${this.product._id}`);
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
}
