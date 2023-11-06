import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMINServicesModule } from './services.module';
import { Observable, forkJoin, map } from 'rxjs';
import { IproductResponse } from '../../interfaces/Product.interface';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/Product.models';

@Injectable({
  providedIn: ADMINServicesModule
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>
  {
    debugger
    return this.http.get<IproductResponse[]>(`${environment.api}/product`)
    .pipe(
      map(
        (originResponse:IproductResponse[])=>{
          return originResponse.map((item:IproductResponse)=>
            new Product(item)
          )
        }
      )
    )
  }


  getById(id: string): Observable<IproductResponse> {
    return this.http.get<IproductResponse>(`${environment.api}/product/${id}`);
  }
// En el servicio de Angular
getProducts(page: number, limit: number, filters: any): Observable<Product[]> {
  const skip = page * limit; // Modificado para evitar problemas de paginación
  const requestPayload = {
    page,
    limit,
    filters,
    sortOrder: "DESC", // Cambiado a DESC para orden descendente
  };

  return this.http.post<Product[]>(`${environment.api}/product/page/${limit}/${skip}`, requestPayload);
}



createProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${environment.api}/product`, product);
}

updateProduct(product: Product): Observable<Product> {
  return this.http.put<Product>(`${environment.api}/product/${product._id}`, product);
}

deleteProduct(id: string): Observable<{ id: string }> {
  return this.http.delete<{ id: string }>(`${environment.api}/product/${id}`);
}

uploadImage(image: File): Observable<string> {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.post<string>(`${environment.api}/product/upload-image`, formData);
}


updateProductImage(productId: string, category: string, image: File): Observable<string> {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.put<string>(`${environment.api}/product/${category}/${productId}/image`, formData);
}

}
