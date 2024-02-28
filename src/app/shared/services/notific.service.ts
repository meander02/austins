import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificService {
  constructor(private http: HttpClient) { }



  // getAllCategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${environment.api}/category`)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error en la solicitud:', error);
  //         return throwError(error);
  //       })
  //     );
  // }


  sendSubscription(subscription: any) {
    // Aquí reemplaza la URL con la dirección de tu API para guardar el token
    const url = 'https://tu-servidor/api/save-subscription';

    return this.http.post(url, subscription);
  }
}
