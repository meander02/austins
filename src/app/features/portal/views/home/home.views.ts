import { Component ,HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: ['./home.views.scss']
})
export class HomeViews {

  constructor(private router: Router) {}
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
    // console.log('Producto en el presentador', this.product);
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
