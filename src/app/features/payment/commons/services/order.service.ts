import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }


  updateOrderStatus(paypalOrderId: string, subscription: any) {
    const url = `${environment.api}/order/updateStatusOrder`; // Ruta a la que enviar la solicitud POST
    return this.http.post(url, { paypalOrderId, subscription });
  }
  // updateOrderStatus(paypalOrderId: string) {
  //   const url = `${environment.api}/order/updateStatusOrder`; // Ruta a la que enviar la solicitud POST
  //   return this.http.post(url, { paypalOrderId });
  // }
}
