import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  progressSteps = [
    { label: 'Datos Personales' },
    { label: 'Datos de Contacto' },
    { label: 'Usuario y Contraseña' },
  ];

}
