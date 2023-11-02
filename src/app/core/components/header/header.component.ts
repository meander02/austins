import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHeaderScrolled = false;
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  badge:number=0
  isDetailRoute: boolean = false; // Declarar la variable isDetailRoute


  // constructor(private searchService: SearchService,private router: Router,private userStateService: UserStateService,private AuthStateService: AuthStateService) {

  // }
  // constructor(private searchService: SearchService, private router: Router, private userStateService: UserStateService, private AuthStateService: AuthStateService) { }
  constructor(private searchService: SearchService, private router: Router, private userStateService: UserStateService, private AuthStateService: AuthStateService, private route: ActivatedRoute) { }


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


  goToCart(): void{
    this.router.navigateByUrl('/payment/cart')
  }
  ngOnInit() {
    debugger
    this.route.url.subscribe(segments => {
      this.isDetailRoute = segments[segments.length - 1].path === '/detail';
    });
  }



}
