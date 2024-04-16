import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.scss']
})
export class PdfGenerateComponent implements OnInit {

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    // Create a custom instance of pdfMake
    const pdfMakeInstance: any = pdfMake;
    pdfMakeInstance.vfs = pdfFonts.pdfMake.vfs;
    pdfMakeInstance.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Bold.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-BoldItalic.ttf'
      }
    };

    this.pedidoService.pedidoInfo$.subscribe((pedidoInfo) => {
      if (pedidoInfo) {
        // Crear el contenido del PDF con la información del pedido
        const pdfDefinition: any = {
          content: [
            {
              text: 'Información del Pedido:',
              style: 'header'
            },
            {
              text: `Código de Pedido: ${pedidoInfo.codigoPedido}`,
              style: 'info'
            },
            {
              text: `Fecha de Creación: ${pedidoInfo.createdAt}`,
              style: 'info'
            },
            // Agregar más detalles del pedido según sea necesario
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            info: {
              fontSize: 14,
              margin: [0, 0, 0, 5]
            }
          }
        };

        // Crear el PDF
        const pdf = pdfMake.createPdf(pdfDefinition);

        // Descargar o abrir el PDF
        pdf.download('pedido.pdf'); // Cambia 'download' por 'open' si prefieres abrirlo directamente en el navegador
      }
    });
  }
}
