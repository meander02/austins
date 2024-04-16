import { PdfGenerateComponent } from './../../../../core/components/pdf-generate/pdf-generate.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../commons/services/order.service';
import { PedidoService } from 'src/app/core/services/pedido.service';
// import { PdfGenerateComponent } from 'src/app/core/services/pedido.service';

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
    private pedidoService: PedidoService,
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
 
    this.orderService.consultarPedido(SEMUYI).subscribe(
      (response) => {
        console.log(response);
        // Verificar la estructura de la respuesta
        // if ('resultado' in response && 'codigoPedido' in response.resultado) {
        this.pedidoInfo = response;
        this.pedidoService.setPedidoInfo(response);

      },
      (error) => {
        console.error('Error al consultar pedido:', error);
      }
    );
  }
}
