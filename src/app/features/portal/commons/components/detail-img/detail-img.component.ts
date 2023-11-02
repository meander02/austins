import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-detail-img',
  templateUrl: './detail-img.component.html',
  styleUrls: ['./detail-img.component.scss'],
})
export class DetailImgComponent implements OnInit, OnChanges {
  @ViewChild('slider', { static: true }) sliderImg: ElementRef | undefined;

  @ViewChild('down')
  imgToDown!: ElementRef;
  @Input()
  srcMain!: string;

  @ViewChild('zoomBox') zoomBox: ElementRef | undefined;

  // @ViewChild('.image-zoom-box') zoomBox: ElementRef | undefined; // Agregar ViewChild para la lupa

  @Input() images: string[] = [
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
    '/assets/64de7c_5c0ba351459045d582cf3f4215ee9229~mv2.webp',
  ];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].currentValue) {
    } else {
      this.srcMain = '';
    }
  }

  currentIndex: number = 0; // Inicializa el índice de la imagen actual en 0

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.srcMain = this.images[0];
    }
  }

  toogleImg(url: string, index: number): void {
    debugger
    this.srcMain = url;
    this.currentIndex = index;
  }

  up(): void {
    this.sliderImg!.nativeElement.scrollTop -= 80;
  }

  down(): void {
    this.sliderImg!.nativeElement.scrollTop += 80;
  }

  startZoom(): void {
    debugger
    if (this.zoomBox) {
      const image = this.zoomBox.nativeElement.previousElementSibling as HTMLImageElement;
      if (image) {
        const scale = 2;
        this.zoomBox.nativeElement.style.backgroundImage = `url('${this.srcMain}')`;
        this.zoomBox.nativeElement.style.display = 'block';
        this.zoomBox.nativeElement.style.width = `${100 * scale}px`;
        this.zoomBox.nativeElement.style.height = `${100 * scale}px`;
      }
    }
  }

  stopZoom(): void {
    if (this.zoomBox) {
      this.zoomBox.nativeElement.style.display = 'none';
    }
  }

  moveZoom(event: MouseEvent): void {
    debugger
    if (this.zoomBox) {
      const image = this.zoomBox.nativeElement.previousElementSibling as HTMLImageElement;
      if (image) {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const scale = 2;
        this.zoomBox.nativeElement.style.backgroundSize = `${image.width * scale}px ${image.height * scale}px`;
        this.zoomBox.nativeElement.style.backgroundPosition = `-${x * scale}px -${y * scale}px`;
      }
    }
  }


}
