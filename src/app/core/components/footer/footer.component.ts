// import { Component,HostListener } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { UserStateService } from '../../../features/admin/commons/services/user-state.service'; //
import { AuthStateService } from './../../../features/auth/commons/services/auth-state.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  anio = new Date().getFullYear().toString();

  constructor(
    private router: Router,
    private authStateService: AuthStateService,
    private userStateService: UserStateService
  ) {}

  get shouldShowFooter(): boolean {
    return (
      !this.authStateService.getisAuthS() &&
      !this.userStateService.getIsAdminSection()
    );
  }
  // constructor(private router: Router) {}

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
