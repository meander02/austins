import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../commons/services/order.service';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-accep-order',
  templateUrl: './accep-order.component.html',
  styleUrls: ['./accep-order.component.scss'],
})
export class AccepOrderComponent implements OnInit {
  SEMUYI: string = '';
  pedidoInfo: any;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService,

  ) {}

  ngOnInit(): void {
    // Iniciar el loader al llegar al componente
    this.ngxLoader.start();

    // Obtener el parámetro SEMUYI de la URL
    this.route.queryParams.subscribe((params) => {
      this.SEMUYI = params['SEMUYI'];
      // Realizar la consulta con el código SEMUYI
      this.consultarCodigo(this.SEMUYI);
    });
  }

  consultarCodigo(SEMUYI: string) {
    this.orderService.consultarPedido(SEMUYI).subscribe(
      (response) => {
        if (response && response.resultado) {
          // Asignar el pedidoInfo
          this.pedidoInfo = response.resultado;
          // Pasar los datos al servicio para generar el PDF
          this.pedidoService.setPedidoInfo(this.pedidoInfo);
          // Redirigir al portal
          this.router.navigate(['/portal/home']);
        } else {
          console.error('La estructura de la respuesta no es válida.');
        }
        // Detener el loader después de la redirección o en caso de error
        this.ngxLoader.stop();
    
      },
      (error) => {
        console.error('Error al consultar pedido:', error);
        // Detener el loader en caso de error
        this.ngxLoader.stop();
      }
    );
  }
}
