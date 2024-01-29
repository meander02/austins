import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-politica-priv',
  templateUrl: './politica-priv.view.html',
  styleUrls: ['./politica-priv.view.scss'],
  animations: [
    trigger('dialogFadeInOut', [
      state('void',
      style({ transform: 'scale(0)', opacity: 0 }
      )
      ),
      transition(':enter', [
        animate(
          '1000ms ease-in',
          style({
            transform: 'scale(1)',
            opacity: 1,
            scroll :-10,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '1000ms ease-out',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class PoliticaPrivView
{
  showSeccionMas = false; // Inicialmente oculta

}
