import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInView } from 'src/app/features/auth/views/sign-in/sign-in.view';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    // './header.component.scss',
    // './header.component0.scss',
    './head02.scss',
    './head03.scss',
    // './header.component02.scss'
  ],
})
export class HeaderComponent  implements OnInit {

  isHeaderScrolled = false;
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  badge: number = 0;
  currentRoute!: string;
  isMobileMenuOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    private searchService: SearchService,
    private cartService: CartService,
    private router: Router,
    private userStateService: UserStateService,
    private AuthStateService: AuthStateService,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        this.currentRoute = event.url;
      }
    });
    // this.cartService.itemsInCart.subscribe((value) => {
    //   this.badge = value;
    // });
  }
  ngOnInit(): void {
    // this.badge=this.cartService.itemsInCart
    this.cartService.itemsInCart.subscribe(value =>{
      this.badge=value
    })
  }

  onSearchChange(query: string) {
    // Llama al servicio para establecer la consulta de búsqueda en tiempo real.
    this.searchService.setSearchQuery(query);
  }

  search(): void {
    if (this.searchQuery) {
      // Llama al servicio para establecer la consulta de búsqueda.
      this.searchService.setSearchQuery(this.searchQuery);
    }
  }
  get shouldShowHeader(): boolean {
    return (
      !this.AuthStateService.getisAuthS() &&
      !this.userStateService.getIsAdminSection()
    );
  }

  redirectTo(route: string): void {
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
  }

  redirectTo_adm(route: string): void {
    this.router.navigate(['/admin', route]); // Utiliza la navegación de Angular
  }
  redirectTo_Auth(route: string): void {
    this.router.navigate(['/auth', route]); // Utiliza la navegación de Angular
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;

      if (this.isMobileMenuOpen) {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    }
    console.log(this.isMobileMenuOpen);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.isHeaderScrolled = true;
    } else {
      this.isHeaderScrolled = false;
    }
  }

  get isAdminSection(): boolean {
    return this.userStateService.getIsAdminSection();
  }

  goToCart(): void {
    // debugger
    this.router.navigateByUrl('/payment/cart');
  }

  isRUTA_DISTINTE_ahome(): boolean {
    // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // Llamamos a la función que manejará la visibilidad de la sección de filtros
        this.handleFilterSectionVisibility();
      }
    });

    // Ahora verifica si la ruta actual es '/portal/home'
    return this.currentRoute === '/portal/home' || this.currentRoute === '/auth/sign-up';

  }

  // Nueva función para manejar la visibilidad de la sección de filtros
  private handleFilterSectionVisibility(): void {
    // Obtenemos la referencia del elemento de la sección de filtros
    const filterSection = document.querySelector('.filter-section');

    // Verificamos si existe el elemento y si la ruta actual es diferente de '/portal/home'
    if (filterSection && this.currentRoute !== '/portal/home') {
      // Añadimos la clase is-detail-route si la ruta no es '/portal/home'
      filterSection.classList.add('is-detail-route');
    } else {
      // Quitamos la clase is-detail-route si la ruta es '/portal/home'
      filterSection?.classList.remove('is-detail-route');
    }
  }


  openSignInModal(): MatDialogRef<SignInView> {
    const isMobile = window.innerWidth < 480;

    const dialogRef = this.dialog.open(SignInView, {
      width: isMobile ? '120vw' : '460px',
      height: isMobile ? 'auto' : 'auto',
      maxWidth: isMobile ? 'auto' : 'auto',
      maxHeight: isMobile ? 'auto' : '100vh',
      panelClass: isMobile
        ? ['mat-dialog', 'no-padding', 'mobile-dialog']
        : ['mat-dialog', 'no-padding', 'web-dialog'],
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal cerrado', result);
    });

    return dialogRef;
  }
}
