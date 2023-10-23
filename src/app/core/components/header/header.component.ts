import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; // Asegúrate de importar tu servicio de estado de usuario

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isHeaderScrolled = false;
  constructor(private router: Router,private userStateService: UserStateService) {}

  redirectTo(route: string): void {
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
  }
  redirectTo_adm(route: string): void {
    this.router.navigate(['/admin', route]); // Utiliza la navegación de Angular
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

}
