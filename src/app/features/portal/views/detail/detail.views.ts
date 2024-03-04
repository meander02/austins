import { Component, OnInit } from '@angular/core';
import { ProductDetail } from '../../models/Product-detail.model';
import { ProductService } from 'src/app/features/admin/commons/services/product.service';
// import { IproductResponse } from '../interfaces/Product.interface'; // Asegúrate de importar la interfaz correcta
import { ActivatedRoute } from '@angular/router';
import { IproductResponse } from '../../interfaces/Product.interface';
import { ScrollServiceService } from 'src/app/shared/services/scroll-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.views.html',
  styleUrls: ['./detail.views.scss']
})
export class DetailViews implements OnInit {

  // productDetail: ProductDetail | undefined;
  productDetail!: ProductDetail;
  //
  idProduct!: string;

  constructor(
    private scrollService: ScrollServiceService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.scrollService.init();
  }


  ngOnInit(): void {

    this.idProduct = this.route.snapshot.params['id'];
    console.log('id desde URL', this.idProduct);
    this.productService.getById(this.idProduct).subscribe((response: IproductResponse) => {
      this.productDetail = new ProductDetail(response);
    })
    this.scrollService.init();
  }
}
