import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isHeaderScrolled = false;
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  badge:number=0
  // constructor(private router: Router,private cartService:CartService) { }


  constructor(private router: Router,private userStateService: UserStateService,private AuthStateService: AuthStateService) {

  }
  get shouldShowHeader(): boolean {
    return !this.AuthStateService.getisAuthS() && !this.userStateService.getIsAdminSection();
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

    if (mobileMenu && mobileMenu.style.display === 'none') {
      mobileMenu.style.display = 'block';
    } else if (mobileMenu) {
      mobileMenu.style.display = 'none';
    }
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

   // Función para realizar la búsqueda
   search(): void {

    if (this.searchQuery) {

    }
  }
  goToCart(): void{
    this.router.navigateByUrl('/payment/cart')
  }

}
