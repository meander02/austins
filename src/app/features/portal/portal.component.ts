import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {


constructor(private router: Router) {
  // Suscribirse a los cambios de la ruta y redirigir en caso de rutas no válidas
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (this.router.url.includes('/portal/not-found') && !this.router.url.includes('/portal/home')) {
        // Redirigir a la página de error si estamos en una ruta no válida
        this.router.navigateByUrl('portal/not-found');
      }
    }
  });
}
}
