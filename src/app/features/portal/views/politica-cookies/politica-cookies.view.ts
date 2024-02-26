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
  selector: 'app-politica-cookies',
  templateUrl: './politica-cookies.view.html',
  styleUrls: ['./politica-cookies.view.scss'],

})
export class PoliticaCookiesView {
  showSeccionMas = false; // Inicialmente oculta
  redirectTo(url: string): void {
    window.location.href = url;
  }

  informacionUtil() {
    // Puedes agregar aquí la lógica para manejar el clic en "¿Esta información fue útil?"
    console.log('Información útil');
    // Puedes hacer más aquí, por ejemplo, enviar datos a un servidor.
  }

  comentarios() {
    // Puedes agregar aquí la lógica para manejar el clic en "Déjanos tus comentarios"
    console.log('Déjanos tus comentarios');
    // Puedes hacer más aquí, por ejemplo, abrir un formulario de comentarios.
  }
}
