import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://ejemplo.com/api/pedidos'; // Reemplaza con la URL de tu servidor de pedidos

  constructor(private http: HttpClient) { }


  updateOrderStatus(paypalOrderId: string, subscription: any) {
    const url = `${environment.api}/order/updateStatusOrder`; // Ruta a la que enviar la solicitud POST
    return this.http.post(url, { paypalOrderId, subscription });
  }

  enviarPedido(datosPedido: any): Observable<any> {
    const url =`${environment.api}/order/solicitarPedido`; // Ruta a la que enviar la solicitud POST
    return this.http.post<any>(url, datosPedido);
  }
}
