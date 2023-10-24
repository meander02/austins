import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-detail-img',
  templateUrl: './detail-img.component.html',
  styleUrls: ['./detail-img.component.scss']
})
export class DetailImgComponent  implements OnInit,OnChanges{

  @ViewChild('slider')
  sliderImg!: ElementRef;//// en esta parte se selcciona por el id slider
  @ViewChild('down')
  imgToDown!: ElementRef;
  // @Input()
  // images!: string[];
  srcMain!: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].currentValue) {

    } else {
      this.srcMain = '';
    }
  }
  @Input() images: string[] = [
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    "https://static.wixstatic.com/media/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg/v1/fill/w_284,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.jpg",
    // Otras rutas de imágenes
  ];
  // : string = ''; // Inicializa la imagen principal en blanco
  currentIndex: number = 0; // Inicializa el índice de la imagen actual en 0

  ngOnInit(): void {
    // Inicializa la imagen principal con la primera imagen de la matriz
    if (this.images.length > 0) {
      this.srcMain = this.images[0];
    }
  }

  toogleImg(url: string, index: number): void {
    this.srcMain = url;
    this.currentIndex = index;
  }





  up(): void {
    this.sliderImg.nativeElement.scrollTop -= 80;
  }

  down(): void {
    this.sliderImg.nativeElement.scrollTop += 80;
  }
}
