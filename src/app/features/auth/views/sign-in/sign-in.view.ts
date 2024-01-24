import { Component , OnInit } from '@angular/core';
import { ISingInRequest } from '../../interfaces/sign-in-request.interface';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss']
})
export class SignInView implements OnInit {
  errorMessage!: string; // Define la variable para almacenar el mensaje de error

  constructor(
    private snackBar: MatSnackBar, // Inyecta MatSnackBar
    private signInService: SignInService,
    private storageService: StorageService,
    private router: Router,
    private dialogRef: MatDialogRef<SignInView> // Inyecta MatDialogRef

  ) {}

  ngOnInit(): void {}

  signIn(data: ISingInRequest): void {
    const config: MatSnackBarConfig = {
      duration: 5000, // Duración en milisegundos
      panelClass: 'error-snackbar' // Puedes agregar estilos personalizados en tu archivo de estilos
    };
    this.signInService.signIn(data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.errorMessage = error.error.message;
            // console.error(this.errorMessage);

            // Muestra un Snackbar con el mensaje de error


            this.snackBar.open(this.errorMessage, 'Cerrar', config);
          } else {
            // Manejo de otros errores si es necesario
          }
          this.snackBar.open(this.errorMessage, 'Cerrar', config);
          return throwError('Error en la solicitud');
        })
      )
      .subscribe((response) => {
        if (response) {
          this.storageService.setToken(response.token);
          this.dialogRef.close();
          this.router.navigateByUrl('/admin');
        }
      });
  }

}
