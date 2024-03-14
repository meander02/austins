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
  ) {}

  get shouldShowFooter(): boolean {
    return (
      !this.authStateService.getisAuthS() &&
      !this.userStateService.getIsAdminSection()&&
      !this.isruta_orderdetail()
    );
  }
  ngOnInit(): void {
    this.scrollService.init();
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl('/portal/' + route);
  }

  isruta_orderdetail(): boolean {
    // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    // Ahora verifica si la ruta actual incluye '/payment/order-detail'
    // return this.currentRoute.startsWith('/payment/order-detail');
    return (
      this.currentRoute === '/payment/'
    );
  }
}
