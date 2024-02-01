import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.view.html',
  styleUrls: [
    './unknown.view.scss',
    './unk.scss',
  ]
})
export class UnknownView {

    constructor(   private router: Router,) { }


  redirectTo(route: string): void {
    this.router.navigate(['/portal', route]); // Utiliza la navegación de Angular
  }

}
