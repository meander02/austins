import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-fond',
  templateUrl: './not-fond.views.html',
  styleUrls: [
    './not-fond.views.scss',
    './not.scss'
  ]
})
export class NotFondViews implements OnInit {

  constructor(   private router: Router,) { }

  ngOnInit(): void {
  }

  // Método para manejar el clic en el botón de contacto
  contactarPropietario() {
    // Puedes agregar lógica adicional aquí, por ejemplo, redirigir a una página de contacto
    console.log('Contactando al propietario...');
  }

  redirectTo(route: string): void {
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
  }
}
