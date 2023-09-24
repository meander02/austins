import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

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
}
