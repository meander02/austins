import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {
  formGroup!: FormGroup;
  quantity!: FormControl;

  @Input() productDetail: any; // Declarar productDetail como un objeto genérico

  constructor() {
    this.formGroup = new FormGroup({
      quantity: new FormControl()
    });

    // Define valores estáticos para productDetail (esto debe coincidir con la estructura de tu modelo)
    this.productDetail = {
      name: 'Producto de ejemplo',
      price: 99.99,
      description: 'Esta es una descripción de ejemplo para el producto.',
      quantity: 10,
      // Otras propiedades del objeto productDetail que puedas tener
    };
  }

  ngOnInit(): void {}
}
