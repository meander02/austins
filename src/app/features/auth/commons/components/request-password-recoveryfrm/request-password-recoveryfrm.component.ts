import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from '../../commons/services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';
import { AuthService } from '../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-request-password-recoveryfrm',
  templateUrl: './request-password-recoveryfrm.component.html',
  styleUrls:[ './request-password-recoveryfrm.component.scss','./so.scss']
})
export class RequestPasswordRecoveryfrmComponent {
  userTouchedForm = false;

  isSubmitting = false;
  group: FormGroup;


  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
  ) {
    const signInValidator = new SignInValidator();
    const signUpValidator = new SignUpValidator();

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.group = this.formBuilder.group({

      email: ['', [Validators.required, Validators.pattern(emailRegex)]],

    });
  }
  onSubmit() {
    this.group.markAllAsTouched();
    Object.keys(this.group.controls).forEach(key => {
      const controlErrors = this.group.get(key)?.errors;
      if (controlErrors != null) {
        console.log(`Error en el campo ${key}:`, controlErrors);
      }
    });

    if (this.group.valid && !this.isSubmitting) {
      // Verificar errores en cada control

      this.isSubmitting = true;

      this.authService
        .signUpAndVerifyEmail(this.group.value)
        .subscribe(
          (response) => {
            this.snackBar.open(response.message, 'Cerrar', {
              duration: 3000,
            });

            this.router.navigate(['/auth/user-create', { userEmail: this.group.value.email }]);
          },
          (error) => {
            const errorMessage = error.error.message || 'Error en el servidor';
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 3000,
            });
          }
        )
        .add(() => {
          this.isSubmitting = false;
        });
    }
  }
  ngOnInit(): void {

  }


  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl;
  }
}
