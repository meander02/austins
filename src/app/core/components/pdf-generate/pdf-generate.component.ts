import { Component, ViewEncapsulation } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrl: './pdf-generate.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PdfGenerateComponent {

  constructor() { }

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
  }

  createPDF(){

    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola mundo',
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }
}
