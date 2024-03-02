import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMINServicesModule } from './services.module';
import { Observable, catchError, forkJoin, map, tap } from 'rxjs';
import { IproductResponse } from '../../interfaces/Product.interface';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/Product.models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>
  {
    // debugger
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

uploadImage(formData: FormData, productId: string): Observable<string[]> {
  // console.log(productId)
  // console.log(productId)
  return this.http.put<string[]>(
    `${environment.api}/product/upload-image/${productId}`,
     formData
  ).pipe(
    catchError((error: any) => {
      console.error('Error uploading image:', error);

      if (error.error instanceof ErrorEvent) {
        console.error('Error Event:', error.error.message);
      } else if (error.status === 0) {
        console.error('Network error:', error);
        // Puedes manejar errores de red de manera específica aquí
      } else {
        console.error('Server Response:', error);
        // Puedes manejar otros errores de manera específica aquí
      }

      throw error;
    }),
    tap((response: string[]) => {
      // console.log('Upload successful:', response);
      // Puedes manejar la respuesta exitosa según tus necesidades
    })
  );
}



updateProductImage(productId: string, image: File): Observable<string> {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.put<string>(`${environment.api}/product/${productId}/image`, formData);
}





updateProductStatus(id: string, status: string): Observable<Product> {
  const url = `${environment.api}/product/${id}/status`;
  const body = { status }; // Puedes enviar otros datos si es necesario

  return this.http.put<Product>(url, body);
}

}
