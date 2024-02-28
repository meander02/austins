import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
// import AOS from 'aos';
import * as AOS from 'aos';
import { SwPush } from '@angular/service-worker';
import { NotificService } from './shared/services/notific.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'austins';
  respuesta: any;

  readonly VAPID_PUBLIC_KEY = "BFYtOg9-LQWHmObZKXm4VIV2BImn5nBrhz4h37GQpbdj0hSBcghJG7h-wldz-fx9aTt7oaqKSS3KXhA4nXf32pY";

  // constructor(
  //   private swPush: SwPush,
  //   private newsletterService: NewsletterService) {}
  // subscribeToNotifications() {
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.VAPID_PUBLIC_KEY
  //   })
  //   .then(sub => {
  //     // Extraer el token de suscripción del endpoint
  //     // const subscriptionToken = this.getSubscriptionToken(sub.endpoint);

  //     // // Llamar al servicio para guardar el token
  //     // this.pushNotificationService.sendSubscription({ token: subscriptionToken }).subscribe(
  //     //   response => console.log("Token saved successfully", response),
  //     //   error => console.error("Error saving token", error)
  //     // );
  //   })
  //   .catch(err => console.error("Could not subscribe to notifications", err));
  // }
  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      // Imprimir el token de suscripción en la consola
      console.log('Token de suscripción:', sub.toJSON());
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  constructor(
    private pushNotificationService: NotificService,
      private swPush: SwPush,
  //  private newsletterService: NewsletterService,
    private storageService:StorageService,private router: Router) {
      this.subscribeToNotifications()
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
