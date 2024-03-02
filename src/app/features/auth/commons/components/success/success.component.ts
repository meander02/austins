import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SignInView } from '../../../views/sign-in/sign-in.view';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-success-form',
  templateUrl: './success.component.html',
  styleUrls: [
    './success.component.scss',
    './scce.scss'
  ]
})
export class SuccessComponent {

  // constructor(private route: ActivatedRoute) {}
  authToken!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService // Inyecta tu servicio de autenticación

  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log('Ruta actual:', event.url);

      }
    });

  }
  ngOnInit(): void {
    // Obtener el token de autenticación de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.authToken = params['token'];
      if (this.authToken) {
        // Almacenar el token en el almacenamiento local
        this.storageService.setToken(this.authToken);
      } else {
        console.error('No se ha obtenido el token de autenticación');
        // Manejar la situación si el token no está presente
      }
    });
  }

  loginWithToken(): void {
    // Verificar si se ha obtenido el token de autenticación
    if (this.authToken) {
      // Almacenar el token en el almacenamiento local
      this.storageService.setToken(this.authToken);
      // Redirigir al usuario al home manteniendo el encabezado y el footer
      this.router.navigate(['/#'], { replaceUrl: true });
    } else {
      console.error('No se ha obtenido el token de autenticación');
      // Manejar la situación si el token no está presente
    }
  }

}
