import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isHeaderScrolled = false;
  constructor(private router: Router) {}

  redirectTo(route: string): void {
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
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

}
