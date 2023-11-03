import { Component , OnInit } from '@angular/core';
import { ISingInRequest } from '../../interfaces/sign-in-request.interface';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss']
})
export class SignInView implements OnInit {
  errorMessage!: string; // Define la variable para almacenar el mensaje de error

  constructor(
    private signInService: SignInService,
    private storageService: StorageService,
    private router: Router,
    private dialogRef: MatDialogRef<SignInView> // Inyecta MatDialogRef

  ) {}

  ngOnInit(): void {}



  signIn(data: ISingInRequest): void {
    this.signInService.signIn(data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.errorMessage = error.error.message; // Asigna el mensaje de error del servidor a errorMessage
            console.error(this.errorMessage);
          } else {
          }
          return throwError('Error en la solicitud');
        })
      )
      .subscribe((Response) => {
        if (Response) {
          this.storageService.setToken(Response.token);
          this.dialogRef.close(); // Cierra el modal
          this.router.navigateByUrl('/admin');
        }
      });
  }

}
