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
import { SessionService } from 'src/app/core/services/session.service';
import { ERol } from 'src/app/shared/constants/rol.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  providers: [MessageService],
})
export class SignInView implements OnInit {
  errorMessage!: string; // Define la variable para almacenar el mensaje de error
  userROL!: string;
  loginAttempts: number = 0; // Variable para almacenar el número de intentos de inicio de sesión fallidos

  constructor(
    private snackBar: MatSnackBar, // Inyecta MatSnackBar
    private signInService: SignInService,
    private storageService: StorageService,
    private router: Router,
    private sessionService: SessionService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<SignInView> // Inyecta MatDialogRef

  ) {}

  ngOnInit(): void {}
  signIn(data: ISingInRequest): void {
    const config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: 'error-snackbar'
    };

    this.signInService.signIn(data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMessage
          });

          this.loginAttempts++; // Incrementa el contador de intentos de inicio de sesión fallidos

          return throwError('Error en la solicitud');
        })
      )
      .subscribe((response) => {
        if (response) {
          this.storageService.setToken(response.token);
          this.dialogRef.close();
          const userData = this.sessionService.getUserData();
          if (userData) {
            this.userROL = userData.rol;
            console.log(this.userROL)
            if (this.userROL === ERol.ADMIN) {
              this.router.navigateByUrl('/admin');
            }
            if (this.userROL === ERol.CLIENT) {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
              console.log(this.userROL)
            }
          }
        }
      });
  }


}
