import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserStateService } from 'src/app/features/admin/commons/services/user-state.service';
import { AuthStateService } from 'src/app/features/auth/commons/services/auth-state.service';
import { ScrollServiceService } from 'src/app/shared/services/scroll-service.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  anio = new Date().getFullYear().toString();
  currentRoute!: string;

  constructor(
    private router: Router,
    private scrollService: ScrollServiceService,

    private authStateService: AuthStateService,
    private userStateService: UserStateService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  get shouldShowFooter(): boolean {

      return this.currentRoute.startsWith('/payment/order-detail');

  }
  get ShowFooter(): boolean {
    return (
      !this.authStateService.getisAuthS() &&
      !this.userStateService.getIsAdminSection()

    );
  }
  ngOnInit(): void {
    this.scrollService.init();
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl('/portal/' + route);
  }

  isruta_orderdetail(): boolean {
    this.currentRoute = this.router.url;

    // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    // Ahora verifica si la ruta actual incluye '/payment/order-detail'
    // return this.currentRoute.startsWith('/payment/order-detail');
    // return this.currentRoute === '/payment/order-detail/'
    return this.currentRoute.startsWith('/payment/order-detail');

  }
  // isRUTA_DISTINTE_ahome(): boolean {
  //   // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.currentRoute = event.url;
  //       // Llamamos a la función que manejará la visibilidad de la sección de filtros
  //     }
  //   });

  //   // Ahora verifica si la ruta actual es '/portal/home'
  //   return (
  //     this.currentRoute === '/portal/home'
  //   // // Ahora verifica si la ruta actual es '/portal/home'
  //   // return (
  //   //   this.currentRoute === '/portal/home' ||
  //   //   this.currentRoute === '/auth/sign-up'
  //   );
  // }



  // Función para verificar si la ruta actual es '/portal/home'
  isRUTA_DISTINTE_ahome(): boolean {
    return this.currentRoute === '/portal/home';
  }
}
