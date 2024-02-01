import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-verfica',

  templateUrl: './error-verfica.view.html',
  styleUrls: [
    './error-verfica.view.scss',
    './err.scss'
  ]
})
export class ErrorVerficaView {
  textAnimationState: string = 'visible'; // Inicializa la propiedad

  constructor(private router: Router) {}

  navigateToInicio() {
    this.router.navigate(['https://austins.vercel.app']);
  }

}
