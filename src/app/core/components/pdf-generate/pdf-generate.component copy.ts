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
//   cont: string = '';
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
//         this.cont = pedidoInfo.contenido;

//         // Construir el contenido detallado del pedido para el PDF
//         const contenidoPedido = [
//           { text: 'Código de Pedido: ' + pedidoInfo.codigoPedido, style: 'header' },
//           { text: 'Usuario:', style: 'subheader' },
//           { text: 'Nombre: ' + pedidoInfo.usuario.name },
//           { text: 'Email: ' + pedidoInfo.usuario.email },
//           { text: 'Teléfono: ' + pedidoInfo.usuario.phone },
//           { text: 'Detalle del Pedido:', style: 'subheader' },
//           { text: 'Cantidad: ' + pedidoInfo.detallePedido.cantidad },
//           { text: 'Día: ' + pedidoInfo.detallePedido.dia },
//           { text: 'Hora: ' + pedidoInfo.detallePedido.hora },
//           { text: 'Modo: ' + pedidoInfo.detallePedido.modo },
//           { text: 'Sabor: ' + pedidoInfo.detallePedido.sabor },
//           { text: 'Precio Total: ' + pedidoInfo.detallePedido.precioTotal },
//           { text: 'Estado del Pedido: ' + pedidoInfo.estadoPedido },
//           { text: 'Fecha de Creación: ' + pedidoInfo.createdAt }
//         ];

//         // Crear el PDF y abrirlo con el contenido del pedido
//         const pdfDefinition = {
//           content: contenidoPedido
//         };

//         const pdf = pdfMake.createPdf(pdfDefinition);
//         pdf.open();
//       }
//     });
//   }
// }
