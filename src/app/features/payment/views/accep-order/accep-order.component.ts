import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../commons/services/order.service';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogRefService } from 'src/app/shared/services/dialog-ref.service';

@Component({
  selector: 'app-accep-order',
  templateUrl: './accep-order.component.html',
  styleUrls: ['./accep-order.component.scss'],
  providers: [DialogService],
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
    private dialogService: DialogService,
    private dialogRefService: DialogRefService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    this.route.queryParams.subscribe((params) => {
      this.SEMUYI = params['SEMUYI'];
      this.consultarCodigo(this.SEMUYI);
    });
  }

  consultarCodigo(SEMUYI: string) {
    this.orderService.consultarPedido(SEMUYI).subscribe(
      (response) => {
        if (response && response.resultado) {
          this.pedidoInfo = response.resultado;
          this.pedidoService.setPedidoInfo(this.pedidoInfo);
          this.router.navigate(['/portal/home']);
        } else {
          console.error('La estructura de la respuesta no es válida.');
        }
        this.ngxLoader.stop();
        this.dialogRefService.closeDialog(); // Cerrar el modal usando el servicio
      },
      (error) => {
        console.error('Error al consultar pedido:', error);
        this.ngxLoader.stop();
      }
    );
  }
}
