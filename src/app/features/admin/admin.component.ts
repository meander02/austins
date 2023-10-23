import { Component ,OnInit} from '@angular/core';
import { UserStateService } from './commons/services/user-state.service'; // Asegúrate de importar tu servicio de estado de usuario
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private userStateService: UserStateService) {}

  ngOnInit() {
    this.userStateService.setIsAdminSection(true); // Cambiar el estado a administrador
  }
}
