import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  userName: string | undefined; // Declarar una variable para almacenar el nombre del usuario

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userName = userData.name; 
    }
    const isAuthenticated = this.sessionService.isAutenticated();
  }
}
