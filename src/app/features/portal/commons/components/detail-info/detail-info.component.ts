import { CartService } from 'src/app/core/services/cart.service';
import { ProductDetail } from '../../../models/Product-detail.model';
import { Product } from './../../../models/Product.models';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ScrollServiceService } from 'src/app/shared/services/scroll-service.service';
import { CartItem } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: [
    './detail-info.component.scss',
    './info.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DetailInfoComponent implements OnInit {
  value1: number = 1;
  product!: Product;
  formGroup!: FormGroup;
  quantity!: FormControl;

  @Input() productDetail: ProductDetail | undefined;
// private scrollService: ScrollServiceService,
  constructor( private scrollService: ScrollServiceService,private router: Router,private cartService: CartService) {
    this.formGroup = new FormGroup({
      quantity: new FormControl()
    });
  }

  ngOnInit(): void {
    this.scrollService.init();
    // this.scrollService.init();
  }


  // addItem(): void {
  //   const value = this.formGroup.get('quantity')!.value;
  //   console.log(this.productDetail!._id)
  //   this.cartService.addItem(this.productDetail!._id, value);
  // }

  addItem(): void {
    const value = this.formGroup.get('quantity')!.value;
    const productId = this.productDetail!._id;

    // Verificar si el producto ya está en el carrito
    const existingCartItem = this.cartService.getCartItem(productId);

    if (existingCartItem) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      this.cartService.updateQuantity(productId, existingCartItem.cantidad + value);
    } else {
      // Si el producto no está en el carrito, agregarlo
      const cartItem: CartItem = {
        id: this.productDetail!._id,
        name: this.productDetail!.name,
        precio: this.productDetail!.price,
        cantidad: value,
        image: this.productDetail!.images, // Corregir el nombre de la propiedad

      };
      this.cartService.add(cartItem);
    }
  }

  redirectTo(route: string): void {
    this.scrollService.reciente();
    this.router.navigateByUrl('/portal/' + route);
  }
}
