import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMINServicesModule } from './services.module';
import { Observable, catchError, forkJoin, map } from 'rxjs';
import { IproductResponse } from '../../interfaces/Product.interface';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/Product.models';
import { HttpHeaders } from '@angular/common/http';

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

uploadImage(formData: FormData): Observable<string> {
  const headers = new HttpHeaders();
  // Agrega cualquier encabezado necesario, por ejemplo, para enviar un token de autenticación

  return this.http.post<string>(`${environment.api}/product/upload-image/`, formData, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error al cargar la imagen:', error);
        // Muestra detalles del error
        if (error.error instanceof ErrorEvent) {
          console.error('Error Event:', error.error.message);
        } else {
          console.error('Server Response:', error);
        }
        throw error; // Reenvía el error para que se maneje en el componente que llama a esta función
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
