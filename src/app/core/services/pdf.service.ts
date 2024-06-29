import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async createPdf(pedidoInfo: any): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const logoUrl = 'https://static.wixstatic.com/media/64de7c_4d76bd81efd44bb4a32757eadf78d898~mv2_d_1765_2028_s_2.png/v1/fill/w_243,h_270,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/64de7c_4d76bd81efd44bb4a32757eadf78d898~mv2_d_1765_2028_s_2.png'; // Reemplaza 'URL_DEL_LOGO' con la URL de tu logo
    const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    // Dimensiones del logo
    const logoDims = logoImage.scale(0.2);

    // Cargar fuentes
    const fontTimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontTimesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Dibujar logo
    page.drawImage(logoImage, {
      x: page.getWidth() / 2 - logoDims.width / 2,
      y: page.getHeight() - logoDims.height - 20,
      width: logoDims.width,
      height: logoDims.height,
    });

    // Dibujar encabezado
    page.drawText('Repostería Austins', {
      x: 50,
      y: 750,
      size: 24,
      font: fontTimesRomanBold,
      color: rgb(0.8, 0.2, 0.2),
    });

    page.drawText('Confirmación de Pedido', {
      x: 50,
      y: 720,
      size: 18,
      font: fontTimesRomanBold,
      color: rgb(0, 0.53, 0.71),
    });

    // Dibujar texto descriptivo
    page.drawText('Este documento sirve como confirmación de su pedido realizado en Repostería Austins. Puede consultar el estado del pedido en la sección "Consultar Estado Pedido" en nuestro sitio web, o presentarlo en nuestro local para obtener información sobre su pedido.', {
      x: 50,
      y: 690,
      size: 12,
      font: fontTimesRoman,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    });

    // Dibujar información del pedido
    const yStart = 650;
    const lineHeight = 20;
    const fields = [
      { label: 'Código de Pedido:', value: pedidoInfo.codigoPedido },
      { label: 'Usuario:', value: '' },
      { label: 'Nombre:', value: pedidoInfo.usuario.name },
      { label: 'Email:', value: pedidoInfo.usuario.email },
      { label: 'Teléfono:', value: pedidoInfo.usuario.phone },
      { label: 'Detalle del Pedido:', value: '' },
      { label: 'Cantidad:', value: pedidoInfo.detallePedido.cantidad },
      { label: 'Día:', value: pedidoInfo.detallePedido.dia },
      { label: 'Hora:', value: pedidoInfo.detallePedido.hora },
      { label: 'Modo:', value: pedidoInfo.detallePedido.modo },
      { label: 'Sabor:', value: pedidoInfo.detallePedido.sabor },
      { label: 'Precio Total:', value: pedidoInfo.detallePedido.precioTotal },
      { label: 'Estado del Pedido:', value: pedidoInfo.estadoPedido },
      { label: 'Fecha de Creación:', value: pedidoInfo.createdAt },
    ];

    let y = yStart;
    fields.forEach(field => {
      page.drawText(field.label, {
        x: 50,
        y: y,
        size: 14,
        font: fontTimesRomanBold,
        color: rgb(0, 0, 0),
      });
      page.drawText(field.value, {
        x: 200,
        y: y,
        size: 14,
        font: fontTimesRoman,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'pedido.pdf');
  }
}
