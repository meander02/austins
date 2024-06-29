// import { Injectable } from '@angular/core';
// import { PDFDocument, rgb } from 'pdf-lib';
// import { saveAs } from 'file-saver';

// @Injectable({
//   providedIn: 'root'
// })
// export class PdfService {

//   constructor() { }

//   async createPdf(pedidoInfo: any): Promise<void> {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     page.drawText(`Código de Pedido: ${pedidoInfo.codigoPedido}`, { x: 50, y: 750, size: 20, color: rgb(0, 0.53, 0.71) });
//     page.drawText(`Usuario:`, { x: 50, y: 720, size: 16, color: rgb(0, 0, 0) });
//     page.drawText(`Nombre: ${pedidoInfo.usuario.name}`, { x: 50, y: 700, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Email: ${pedidoInfo.usuario.email}`, { x: 50, y: 680, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Teléfono: ${pedidoInfo.usuario.phone}`, { x: 50, y: 660, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Detalle del Pedido:`, { x: 50, y: 630, size: 16, color: rgb(0, 0, 0) });
//     page.drawText(`Cantidad: ${pedidoInfo.detallePedido.cantidad}`, { x: 50, y: 610, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Día: ${pedidoInfo.detallePedido.dia}`, { x: 50, y: 590, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Hora: ${pedidoInfo.detallePedido.hora}`, { x: 50, y: 570, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Modo: ${pedidoInfo.detallePedido.modo}`, { x: 50, y: 550, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Sabor: ${pedidoInfo.detallePedido.sabor}`, { x: 50, y: 530, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Precio Total: ${pedidoInfo.detallePedido.precioTotal}`, { x: 50, y: 510, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Estado del Pedido: ${pedidoInfo.estadoPedido}`, { x: 50, y: 490, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Fecha de Creación: ${pedidoInfo.createdAt}`, { x: 50, y: 470, size: 12, color: rgb(0, 0, 0) });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     saveAs(blob, 'pedido.pdf');
//   }
// }
