import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: ['./home.views.scss']
})
export class HomeViews {

  constructor(private router: Router) {}

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
