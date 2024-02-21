import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
// import AOS from 'aos';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'austins';



  // constructor( private storageService:StorageService){

  // }
  constructor(private storageService:StorageService,private router: Router) {
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
  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load',AOS.refresh)
    
      if(!this.storageService.getCarrito){
        this.storageService.setCarrito([])
      }
  }

  isChatOpen = false;

  toggleChat(isOpen: boolean) {
    this.isChatOpen = isOpen;
  }

}
