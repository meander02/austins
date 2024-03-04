import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private scrollService: ScrollServiceService,

    private authStateService: AuthStateService,
    private userStateService: UserStateService
  ) {}

  get shouldShowFooter(): boolean {
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
}
