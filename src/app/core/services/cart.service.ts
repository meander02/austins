import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  itemsInCart: Subject<number> = new Subject<number>();
  quantity: number = 0;

  constructor( private storegService: StorageService) {}

  addItem(id: string, quantity: number): void {

    this.cart=this.storegService.getCarrito()
    this.cart.forEach((item) => {
      if (item.id === id) {
        item.cantidad = item.cantidad + quantity;
      }
    });
    this.sendQuantity();
    this.storegService.setCarrito(this.cart)
  }


  add(cartItem: CartItem): void {
    let isExist = false;
    this.cart=this.storegService.getCarrito()
    if (this.cart && this.cart.length > 0) {
      this.cart.forEach((item) => {
        if (item.id === cartItem.id) {
          item.cantidad = item.cantidad+ 1;
          isExist = true;
        }
      });
      if (!isExist) {
        this.cart.push(cartItem);
      }
    } else {
      this.cart = [cartItem];
    }
    this.sendQuantity();
    // localStorage.setItem('carrito', JSON.stringify(this.cart));
    this.storegService.setCarrito(this.cart)
  }

  remove(cartItem: CartItem): void {
    this.cart=this.storegService.getCarrito()
    if (this.cart && this.cart.length > 0) {
      this.cart.forEach((item) => {
        if (item.id === cartItem.id && item.cantidad > 0) {
          item.cantidad = item.cantidad- 1;
        } else if (this.quantity === 0) {
          // this.cart = this.cart.find(item => item.id != cartItem.id)
        }
      });
    }
    this.sendQuantity();
    this.storegService.setCarrito(this.cart)
  }

  private sendQuantity(): void {
    this.quantity = 0;
    this.cart.forEach((item) => {
      this.quantity = this.quantity + item.cantidad;
    });
    this.itemsInCart.next(this.quantity);
  }
}
