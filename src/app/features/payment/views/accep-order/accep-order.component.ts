import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../commons/services/order.service';

@Component({
  selector: 'app-accep-order',
  templateUrl: './accep-order.component.html',
  styleUrls: ['./accep-order.component.scss']
})
export class AccepOrderComponent implements OnInit {
  SEMUYI: string = "";
  pedidoInfo: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro SEMUYI de la URL
    this.route.queryParams.subscribe(params => {
      this.SEMUYI = params['SEMUYI'];
      // Realizar la consulta con el código SEMUYI
      this.consultarCodigo(this.SEMUYI);
    });
  }
  consultarCodigo(SEMUYI: string) {
    // Realizar la consulta HTTP con el código SEMUYI
    // this.http.get(`/publicR?code=${SEMUYI}`).subscribe(
    //   (response: any) => {
    //     console.log('Respuesta de la consulta:', response);
    //     // Aquí puedes manejar la respuesta según sea necesario
    //     this.pedidoInfo = response;
    //   },
    //   (error) => {
    //     console.error('Error al realizar la consulta:', error);
    //     // Aquí puedes manejar los errores según sea necesario
    //   }
    // );

    this.orderService.consultarPedido(SEMUYI).subscribe(
      (response) => {
        console.log(response);
        // Verificar la estructura de la respuesta
        // if ('resultado' in response && 'codigoPedido' in response.resultado) {
        this.pedidoInfo = response;
      },
      (error) => {
        console.error('Error al consultar pedido:', error);
      }
    );
  }
}
