import { Component, ChangeDetectorRef } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1600ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1000ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('dialogFadeInOut', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      transition(':enter', [
        animate('2000ms ease-in', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class CookiesComponent {
  isPrivacyCookiesVisible = true;
  currentRoute!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private cdr: ChangeDetectorRef
  ) {
    this.route.url.subscribe((urlSegments) => {
      this.currentRoute = '/' + urlSegments.join('/'); // Construir la ruta completa
      // console.log(this.currentRoute);
      this.updatePrivacyCookiesVisibility();

    });
  }



  closePrivacyCookies() {

    if (this.isCookieRoute()) {
      this.isPrivacyCookiesVisible = false;
    }
    this.isPrivacyCookiesVisible = false;
  }

  redirectTo(route: string): void {
    // console.log('Redirecting...');
    this.closePrivacyCookies()
    this.router.navigateByUrl('/portal/' + route);
  }
  updatePrivacyCookiesVisibility() {
    this.isPrivacyCookiesVisible = !this.isCookieRoute();
  }


  isCookieRoute(): boolean {
    return this.currentRoute === '/portal/cookies';
  }
}
