import { Component ,HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.views.html',
  styleUrls: ['./home.views.scss']
})
export class HomeViews {

  constructor(private router: Router) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    cursor.style.left = (event.clientX - 10) + 'px'; // Ajusta el offset según el tamaño de tu cursor
    cursor.style.top = (event.clientY - 10) + 'px';
  }

  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
