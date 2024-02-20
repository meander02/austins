import { Component, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-password-recoveryfrm',
  templateUrl: './request-password-recoveryfrm.component.html',
  styleUrls: [
    './request-password-recoveryfrm.component.scss',
    './so.scss',
    './so01.scss',
    './so02.scss',
    './so03.scss',
    './form.scss',
  ],
  providers: [MessageService],
})
export class RequestPasswordRecoveryfrmComponent {
  breadcrumbItems = [
    { label: 'Inicio', url: '#' },
    { label: 'Solicitud de Recuperación de Contraseña', url: '/recovery' },
  ];

  items = [{ label: 'Paso 1' }, { label: 'Paso 2' }, { label: 'Paso 3' }];
  step: 'paso1' | 'paso2' | 'paso3' = 'paso1';
  // Add this property to your component class
  // stepCompleted: boolean[] = [false, false, false];
  step1Disabled = false;
  step2Disabled = true;
  step3Disabled = true;

  passwordVisible = false;
  passwordFieldType = 'password';
  activeIndex = 0;
  userTouchedForm = false;
  isSubmitting = false;
  group: FormGroup;
  group2: FormGroup;
  group3: FormGroup;
  // tabsInteractive = true;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private el: ElementRef
  ) {
    const signInValidator = new SignInValidator();
    const signUpValidator = new SignUpValidator();

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.group = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
    });
    this.group2 = this.formBuilder.group({
      verificationCode: ['', Validators.required], // Añadir campos adicionales según sea necesario
    });
    this.group3 = this.formBuilder.group({
      newPassword: ['', [Validators.required, SignInValidator.formatPassword]],
      confirmPassword: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
    });
  }

  onSubmitStep1() {
    if (this.group.valid) {
      const email = this.group.value.email;
      this.authService.requestPasswordRecovery({ email }).subscribe(
        (response) => {
          // Manejar la respuesta exitosa, por ejemplo, cambiar al siguiente paso
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: response.message,
          });
          // console.log(response)
          // this.stepCompleted[0] = true;
          // this.stepCompleted[0] = true;

          // this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });

          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

          // Enable Step 2
          this.step1Disabled = true;
          this.step2Disabled = false;
          this.activeIndex = 1;
        },
        (error) => {
          // console.log(error)
          // Manejar errores, por ejemplo, mostrar un mensaje de error
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
  onSubmitStep2() {
    if (this.group2.valid) {
      const email = this.group.value.email;
      const verificationCode = this.group2.value.verificationCode;

      this.authService
        .verifyVerificationCode({ email, verificationCode })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa, por ejemplo, cambiar al siguiente paso
            // this.stepCompleted[1] = true;

            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: response.message,
            });

            // this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });

            this.step2Disabled = true;
            this.step3Disabled = false;
            console.log(response);
            this.activeIndex = 2;
          },
          (error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 3000,
            });
          }
        );
    }
  }

  onSubmitStep3() {
    if (this.group3.valid) {
      const email = this.group.value.email;
      const verificationCode = this.group2.value.verificationCode;
      const newPassword = this.group3.value.newPassword;
      console.log(email, verificationCode, newPassword);
      // this.stepCompleted[1] = true;
      this.authService
        .verifyCodeAndResetPassword({ email, verificationCode, newPassword })
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa, por ejemplo, redirigir a la página de inicio de sesión

            // this.messageService.add({
            //   severity: 'success',
            //   summary: 'Success',
            //   detail: response.message
            // });
            // this.router.navigate(['/']).then(() => {
            //   window.location.reload();
            // });
            // console.log(response)

            if (response) {
              // Manejar la respuesta exitosa, por ejemplo, redirigir a la página de inicio de sesión

              this.snackBar.open( response.message, 'Cerrar', {
                duration: 5000,
              });
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });

            }
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
            // console.log(response.message);
          },
          (error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.log(error);
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 5000,
            });
          }
        );
      // this.tabsInteractive = false;
    }
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMatch: true };
  }

  onConfirmPasswordInput(event: Event) {
    const confirmInput = event.target as HTMLInputElement;
    const confirmPasswordControl = this.group.get('confirmPassword');

    if (confirmPasswordControl) {
      const password = this.group.get('newPassword')?.value;
      const confirmPassword = confirmInput.value;

      if (password === confirmPassword) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ passwordMatch: true });
      }
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }
  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl;
  }

  get verificationCodeFormControl(): FormControl {
    return this.group2.get('verificationCode') as FormControl;
  }

  get newPasswordFormControl(): FormControl {
    return this.group3.get('newPassword') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.group3.get('confirmPassword') as FormControl;
  }

  onSubmit() {
    if (this.group.valid && !this.isSubmitting) {
      // Lógica para procesar el formulario actual
      switch (this.activeIndex) {
        case 0:
          // Lógica para la primera sección (paso 1)
          // Puedes enviar el correo de verificación, etc.
          break;
        case 1:
          // Lógica para la segunda sección (paso 2)
          // Puedes verificar el código de verificación, etc.
          break;
        case 2:
          // Lógica para la tercera sección (paso 3)
          // Puedes restablecer la contraseña, etc.
          break;
        default:
          break;
      }

      // Cambiar a la siguiente sección
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      }
    }
  }
}
