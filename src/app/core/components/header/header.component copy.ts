// import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
// import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
// import { NavigationEnd, Router } from '@angular/router';
// import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
// import { SearchService } from 'src/app/shared/services/search-service.service';
// import { ActivatedRoute } from '@angular/router';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { SignInView } from 'src/app/features/auth/views/sign-in/sign-in.view';
// import { CartService } from '../../services/cart.service';
// import { SessionService } from '../../services/session.service';
// import { Sidebar } from 'primeng/sidebar';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: [
//     './header.component.scss',
//     './header.component0.scss',
//     './head02.scss',
//     './head03.scss',
//     './head04.scss',
//     './head05.scss',
//     './header.component02.scss'
//   ],
//   styles: [
//     `
//         :host {
//             @keyframes slidedown-icon {
//                 0% {
//                     transform: translateY(0);
//                 }

//                 50% {
//                     transform: translateY(20px);
//                 }

//                 100% {
//                     transform: translateY(0);
//                 }
//             }

//             .slidedown-icon {
//                 animation: slidedown-icon;
//                 animation-duration: 3s;
//                 animation-iteration-count: infinite;
//             }

//             .box {
//                 background-image: radial-gradient(var(--primary-300), var(--primary-600));
//                 border-radius: 50% !important;
//                 color: var(--primary-color-text);
//             }
//         }
//     `
// ]
// })
// export class HeaderComponent  implements OnInit {
//  userName: string | undefined;
//   isHeaderScrolled = false;
//   searchQuery: string = '';
//   badge: number = 0;
//   currentRoute!: string;
//   isMobileMenuOpen: boolean = false;


//   visible: boolean = false;

//   showDialog() {
//       this.visible = true;
//   }

//   // sidebarVisible: boolean = false;
//   @ViewChild('sidebarRef') sidebarRef!: Sidebar;

//   closeCallback(e: Event): void {
//       this.sidebarRef.close(e);
//   }

//   sidebarVisible: boolean = false;
//   constructor(
//     public dialog: MatDialog,
//     private searchService: SearchService,
//     private cartService: CartService,
//     private router: Router,
//     private userStateService: UserStateService,
//     private AuthStateService: AuthStateService,
//     private sessionService: SessionService,
//     private route: ActivatedRoute
//   ) {
//     router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         console.log('Ruta actual:', event.url);
//         this.currentRoute = event.url;
//       }
//     });
//     this.cartService.itemsInCart.subscribe((value) => {
//       this.badge = value;
//     });
//   }



//   ngOnInit(): void {
//     const userData = this.sessionService.getUserData();
//     if (userData) {
//       this.userName = userData.name;
//       // console.log( this.userName)
//       // console.log( userData)
//     }
//     this.cartService.itemsInCart.subscribe(value =>{
//       this.badge=value
//     })
//     const isAuthenticated = this.sessionService.isAutenticated();

//   }
//   logout(): void {
//     // Elimina el token de autenticación del almacenamiento local
//     // this.sessionService.removeToken(); // Si ya tienes un método removeToken en tu servicio, úsalo
//     localStorage.removeItem('token'); // O elimina directamente el token del almacenamiento local aquí

//     // Navega a la ruta principal ('/')
//     this.router.navigate(['/']).then(() => {
//       // Recarga la página después de navegar a la ruta principal
//       window.location.reload();
//     });
//   }
//   onSearchChange(query: string) {
//     // Llama al servicio para establecer la consulta de búsqueda en tiempo real.
//     this.searchService.setSearchQuery(query);
//   }

//   search(): void {
//     if (this.searchQuery) {
//       // Llama al servicio para establecer la consulta de búsqueda.
//       this.searchService.setSearchQuery(this.searchQuery);
//     }
//   }
//   get shouldShowHeader(): boolean {
//     return (
//       !this.AuthStateService.getisAuthS() &&
//       !this.userStateService.getIsAdminSection()
//     );
//   }

//   redirectTo(route: string): void {
    
//   this.sidebarVisible = false;
//     this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
//   }

//   redirectTo_adm(route: string): void {
//     // this.sidebarVisible = false;
//     this.router.navigate(['/admin', route]); // Utiliza la navegación de Angular
//   }
//   redirectTo_Auth(route: string): void {
//     // this.sidebarVisible = false;
//     this.router.navigate(['/auth', route]); // Utiliza la navegación de Angular
//   }

//   toggleMobileMenu() {
//     const mobileMenu = document.getElementById('mobileMenu');
//     if (mobileMenu) {
//       this.isMobileMenuOpen = !this.isMobileMenuOpen;

//       if (this.isMobileMenuOpen) {
//         mobileMenu.style.display = 'block';
//       } else {
//         mobileMenu.style.display = 'none';
//       }
//     }
//     console.log(this.isMobileMenuOpen);
//   }
//   // sidebarVisible() :void {

//   // }

//   @HostListener('window:scroll', ['$event'])
//   onWindowScroll() {
//     if (window.scrollY > 0) {
//       this.isHeaderScrolled = true;
//     } else {
//       this.isHeaderScrolled = false;
//     }
//   }

//   get isAdminSection(): boolean {
//     return this.userStateService.getIsAdminSection();
//   }

//   goToCart(): void {
//     // debugger
//     this.router.navigateByUrl('/payment/cart');
//   }

//   isRUTA_DISTINTE_ahome(): boolean {
//     // Utiliza el evento de cambio de ruta para actualizar 'currentRoute'
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.currentRoute = event.url;
//         // Llamamos a la función que manejará la visibilidad de la sección de filtros
//         this.handleFilterSectionVisibility();
//       }
//     });

//     // Ahora verifica si la ruta actual es '/portal/home'
//     return this.currentRoute === '/portal/home' || this.currentRoute === '/auth/sign-up';

//   }

//   // Nueva función para manejar la visibilidad de la sección de filtros
//   private handleFilterSectionVisibility(): void {
//     // Obtenemos la referencia del elemento de la sección de filtros
//     const filterSection = document.querySelector('.filter-section');

//     // Verificamos si existe el elemento y si la ruta actual es diferente de '/portal/home'
//     if (filterSection && this.currentRoute !== '/portal/home') {
//       // Añadimos la clase is-detail-route si la ruta no es '/portal/home'
//       filterSection.classList.add('is-detail-route');
//     } else {
//       // Quitamos la clase is-detail-route si la ruta es '/portal/home'
//       filterSection?.classList.remove('is-detail-route');
//     }
//   }


//   openSignInModal(): MatDialogRef<SignInView> {
//     this.sidebarVisible = false;
//     const isMobile = window.innerWidth < 480;

//     const dialogRef = this.dialog.open(SignInView, {
//       width: isMobile ? '120vw' : '460px',
//       height: isMobile ? 'auto' : 'auto',
//       maxWidth: isMobile ? 'auto' : 'auto',
//       maxHeight: isMobile ? 'auto' : '100vh',
//       panelClass: isMobile
//         ? ['mat-dialog', 'no-padding', 'mobile-dialog']
//         : ['mat-dialog', 'no-padding', 'web-dialog'],
//       data: {},
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log('Modal cerrado', result);
//     });

//     return dialogRef;
//   }







// }
