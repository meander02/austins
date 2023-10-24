import { AuthStateService } from './commons/services/auth-state.service';
// import { AuthStateService } from './../../feactures/auth/services/auth-state.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(private AuthStateService: AuthStateService) {}

  ngOnInit() {
    this.AuthStateService.setIsAuthSection(true); // Cambiar el estado a administrador
  }
}
