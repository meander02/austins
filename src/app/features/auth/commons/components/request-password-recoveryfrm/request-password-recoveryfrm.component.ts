import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
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
    './password-input.component.scss',
    './request-password-recoveryfrm.component.scss',
    './so.scss',
    './so01.scss',
    './so02.scss',
    './so03.scss',
    './form.scss',
  ],
  encapsulation: ViewEncapsulation.None,
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
  // step2Disabled = false;

  passwordVisible = false;
  passwordFieldType = 'password';
  activeIndex = 0;
  userTouchedForm = false;
  isSubmitting = false;
  group: FormGroup;
  group2: FormGroup;
  group3: FormGroup;
  // tabsInteractive = true;
  timeRemaining: number = 300; // 5 minutos en segundos
  intervalId: any;
  showTimer: boolean = false;

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
      email: [''],
    });
    this.group2 = this.formBuilder.group({
      verificationCode: [''],
    });
    this.group3 = this.formBuilder.group({
      newPassword: [''],
      confirmPassword: [''],
    });
    // Marcar todos los campos como "pristine" al inicio
  }

  onSubmitStep1() {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // Agregar validators después de la petición
    this.group
      .get('email')
      ?.setValidators([Validators.required, Validators.pattern(emailRegex)]);
    this.group.get('email')?.updateValueAndValidity();
    if (this.group.valid) {
      const email = this.group.value.email;

      // Obtener la suscripción del servicio worker
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            console.log('Subscription:', subscription);

            // Convertir las claves p256dh y auth a base64
            const p256dhKey = subscription.getKey('p256dh');
            const authKey = subscription.getKey('auth');

            if (!p256dhKey || !authKey) {
              console.error(
                'Las claves p256dh o auth están ausentes en la suscripción.'
              );
              return;
            }

            const subObj = {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: this.arrayBufferToBase64(p256dhKey),
                auth: this.arrayBufferToBase64(authKey),
              },
            };
            console.log('Subscription Object:', subObj);

            // Enviar la suscripción al backend junto con el email
            this.authService
              .requestPasswordRecovery({ email, subscription: subObj })
              .subscribe(
                (response) => {
                  this.messageService.add({
                    severity: 'info',
                    summary: 'Info',
                    detail: response.message,
                  });
                  this.showTimer = true; // Mostrar el componente de tiempo restante

                  this.startTimer();

                  this.step1Disabled = true;
                  this.step2Disabled = false;
                  this.activeIndex = 1;
                },
                (error) => {
                  this.snackBar.open(error.error.message, 'Cerrar', {
                    duration: 3000,
                  });
                }
              );
          } else {
            console.error('No hay una suscripción disponible.');
          }
        });
      });
    }
  }

  // Función para convertir un ArrayBuffer a base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // onSubmitStep1() {
  //   const emailRegex =
  //     /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //   // Agregar validators después de la petición
  //   this.group
  //     .get('email')
  //     ?.setValidators([Validators.required, Validators.pattern(emailRegex)]);
  //   this.group.get('email')?.updateValueAndValidity();
  //   if (this.group.valid) {
  //     const email = this.group.value.email;
  //     this.authService.requestPasswordRecovery({ email }).subscribe(
  //       (response) => {
  //         this.messageService.add({
  //           severity: 'info',
  //           summary: 'Info',
  //           detail: response.message,
  //         });
  //         this.showTimer = true; // Mostrar el componente de tiempo restante

  //         this.startTimer();

  //         this.step1Disabled = true;
  //         this.step2Disabled = false;
  //         this.activeIndex = 1;
  //       },
  //       (error) => {
  //         this.snackBar.open(error.error.message, 'Cerrar', {
  //           duration: 3000,
  //         });
  //       }
  //     );
  //   }
  // }

  timeLeft: number = 300; // 300 segundos = 5 minutos
  timer: any;

  startTimer() {
    this.intervalId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.intervalId); // Detener el temporizador cuando llegue a cero
      }
    }, 1000); // Actualizar cada segundo
  }
  formatTimeLeft(): string {
    const minutes: number = Math.floor(this.timeRemaining / 60);
    const seconds: number = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  onSubmitStep2() {
    this.group2.get('verificationCode')?.setValidators([Validators.required]);
    this.group2.get('verificationCode')?.updateValueAndValidity();
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
    //     this.group3 = this.formBuilder.group({
    //       newPassword: ['', [Validators.required, SignInValidator.formatPassword]],
    //       confirmPassword: [
    //         '',
    //         [Validators.required, this.passwordMatchValidator.bind(this)],
    //       ],
    this.group3
      .get('newPassword')
      ?.setValidators([Validators.required, SignInValidator.formatPassword]);
    this.group3.get('newPassword')?.updateValueAndValidity();
    this.group3
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ]);
    this.group3.get('confirmPassword')?.updateValueAndValidity();

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

              this.snackBar.open(response.message, 'Cerrar', {
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
    const confirmPasswordControl = this.group3.get('confirmPassword');

    if (confirmPasswordControl) {
      const password = this.group3.get('newPassword')?.value;
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
