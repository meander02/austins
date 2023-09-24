import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  anio = new Date().getFullYear().toString()


  constructor(private router: Router) {}

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
