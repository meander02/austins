// import { Component, OnInit } from '@angular/core';
// import { PedidoService } from '../../services/pedido.service';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// @Component({
//   selector: 'app-pdf-generate',
//   templateUrl: './pdf-generate.component.html',
//   styleUrls: ['./pdf-generate.component.scss']
// })
// export class PdfGenerateComponent implements OnInit {
//   cont :string=''
//   constructor(private pedidoService: PedidoService) { }

//   ngOnInit() {
//     // Create a custom instance of pdfMake
//     const pdfMakeInstance: any = pdfMake;
//     pdfMakeInstance.vfs = pdfFonts.pdfMake.vfs;
//     pdfMakeInstance.fonts = {
//       Roboto: {
//         normal: 'Roboto-Regular.ttf',
//         bold: 'Roboto-Bold.ttf',
//         italics: 'Roboto-Italic.ttf',
//         bolditalics: 'Roboto-BoldItalic.ttf'
//       }
//     };

//     this.pedidoService.pedidoInfo$.subscribe((pedidoInfo) => {
//       if (pedidoInfo) {
//         console.log(pedidoInfo);
//         this.cont=pedidoInfo.contenido
        
//         const mensaje = "Mensaje adicional: "+pedidoInfo.codigoPedido;

//         // Crear el contenido del PDF con la información del pedido y el mensaje adicional
//         const pdfDefinition = {
//             content: [
              
//                 { text: mensaje }
//             ]
//         };

//         // Crear el PDF y abrirlo
//         const pdf = pdfMake.createPdf(pdfDefinition);
//         pdf.open();
//       }
//     });
//   }

// }
