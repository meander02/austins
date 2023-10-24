import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(
    private router: Router,
  ) {}
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

  // @Input()
  // product!: Product;
  // items: number=0;


  // get cartItem(): CartItem {
  //   return this.setCartItem();
  // }
  // constructor(private router: Router, public cartService: CartService) { }
  // constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // console.log('Producto en el presentador', this.product);
  }


  // setCartItem(): CartItem {
  //   const cartItem: CartItem = {
  //     id: this.product._id,
  //     name: this.product.name,
  //     precio: this.product.price,
  //     cantidad: 1,
  //     image: this.product.image
  //   }
  //   return cartItem;
  // }

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
