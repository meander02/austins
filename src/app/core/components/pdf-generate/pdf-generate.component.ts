import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.scss']
})
export class PdfGenerateComponent implements OnInit {
  cont: string = '';
  constructor(private pedidoService: PedidoService, private pdfService: PdfService) { }

  ngOnInit() {
    this.pedidoService.pedidoInfo$.subscribe((pedidoInfo) => {
      if (pedidoInfo) {
        console.log("pedido",pedidoInfo);
        this.cont = pedidoInfo.contenido;

        this.pdfService.createPdf(pedidoInfo);
      }
    });
  }
}
