import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { OrderService } from '../../commons/services/order.service'
import { PedidoService } from 'src/app/core/services/pedido.service'

@Component({
  selector: 'app-accep-order',
  templateUrl: './accep-order.component.html',
  styleUrls: ['./accep-order.component.scss'],
})
export class AccepOrderComponent implements OnInit {
  SEMUYI: string = ''
  pedidoInfo: any

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro SEMUYI de la URL
    this.route.queryParams.subscribe((params) => {
      this.SEMUYI = params['SEMUYI']
      // Realizar la consulta con el código SEMUYI
      this.consultarCodigo(this.SEMUYI)
    })
  }
  consultarCodigo(SEMUYI: string) {
    this.orderService.consultarPedido(SEMUYI).subscribe(
      (response) => {
        // console.log(response);
        // // Verificar la estructura de la respuesta
        // // if ('resultado' in response && 'codigoPedido' in response.resultado) {
        // this.pedidoInfo = response;
        // this.pedidoService.setPedidoInfo(response);
        if (response && response.resultado) {
          // Asignar el pedidoInfo
          this.pedidoInfo = response.resultado
          // Pasar los datos al servicio para generar el PDF
          this.pedidoService.setPedidoInfo(this.pedidoInfo)
        } else {
          console.error('La estructura de la respuesta no es válida.')
        }
      },
      (error) => {
        console.error('Error al consultar pedido:', error)
      },
    )
  }
}
