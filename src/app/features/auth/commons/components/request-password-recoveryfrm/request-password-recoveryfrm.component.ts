import { Component, ElementRef, ViewEncapsulation } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator'
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator'
import { AuthService } from '../../services/auth.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { MessageService } from 'primeng/api'
import { NgxUiLoaderService } from 'ngx-ui-loader'
import { catchError, finalize, throwError } from 'rxjs'

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
    {
      label: 'Inicio',
      command: () => {
        this.redirectToHome('home')
      },
    },
    {
      label: 'Solicitud de Recuperación de Contraseña',
      command: () => {
        this.redirectTo('#')
      },
    },
  ]

  items = [{ label: 'Paso 1' }, { label: 'Paso 2' }, { label: 'Paso 3' }]
  step: 'paso1' | 'paso2' | 'paso3' = 'paso1'
  // Add this property to your component class
  // stepCompleted: boolean[] = [false, false, false];
  step1Disabled = false
  // step2Disabled = true;
  step3Disabled = true
  // step3Disabled = false;
  step2Disabled = true

  passwordVisible = false
  passwordFieldType = 'password'
  activeIndex = 0
  userTouchedForm = false
  isSubmitting = false
  group: FormGroup
  group2: FormGroup
  group3: FormGroup
  // tabsInteractive = true;
  timeRemaining: number = 300 // 5 minutos en segundos
  intervalId: any
  showTimer: boolean = false
  timeRemainingMinutes: number = 5 // Establecemos el tiempo restante inicialmente en 5 minutos
  // intervalId: any; // Variable para almacenar el ID del intervalo
  timeRemainingSeconds: number // Variable para almacenar el tiempo restante en segundos
  //

  // constructor(
  //   private questionviewService: QuestionviewService,
  //   ){

  //   }
  constructor(
    private ngxService: NgxUiLoaderService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private el: ElementRef,
  ) {
    const signInValidator = new SignInValidator()
    const signUpValidator = new SignUpValidator()
    this.timeRemainingSeconds = this.timeRemainingMinutes * 60 // Convertimos los minutos a segundos

    // const emailRegex =
    //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.group = this.formBuilder.group({
      email: [''],
    })
    this.group2 = this.formBuilder.group({
      verificationCode: [''],
    })
    this.group3 = this.formBuilder.group({
      newPassword: [''],
      confirmPassword: [''],
    })
    // Marcar todos los campos como "pristine" al inicio
  }

  onSubmitStep1() {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    this.group
      .get('email')
      ?.setValidators([Validators.required, Validators.pattern(emailRegex)])
    this.group.get('email')?.updateValueAndValidity()

    if (this.group.valid) {
      const email = this.group.value.email

      this.ngxService.start()

      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            const p256dhKey = subscription.getKey('p256dh')
            const authKey = subscription.getKey('auth')

            if (!p256dhKey || !authKey) {
              console.error(
                'Las claves p256dh o auth están ausentes en la suscripción.',
              )
              return
            }

            const subObj = {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: this.arrayBufferToBase64(p256dhKey),
                auth: this.arrayBufferToBase64(authKey),
              },
            }

            this.authService
              .requestPasswordRecovery({ email, subscription: subObj })
              .pipe(
                catchError((error) => {
                  this.snackBar.open(error.error.message, 'Cerrar', {
                    duration: 3000,
                  })
                  return throwError(error)
                }),
                finalize(() => {
                  this.ngxService.stop()
                }),
              )
              .subscribe((response) => {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Info',
                  detail: response.message,
                })
                this.showTimer = true
                this.startTimer()
                this.step1Disabled = true
                this.step2Disabled = false
                this.activeIndex = 1
              })
          } else {
            console.error('No hay una suscripción disponible.')
          }
        })
      })
    }
  }

  // Función para convertir un ArrayBuffer a base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  timeLeft: number = 300 // 300 segundos = 5 minutos
  timer: any

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timeRemainingSeconds--
      if (this.timeRemainingSeconds <= 0) {
        clearInterval(this.intervalId) // Detener el temporizador cuando llegue a cero
      }
    }, 1000) // Actualizar cada segundo
  }

  formatTimeLeft(): string {
    const minutes: number = Math.floor(this.timeRemainingSeconds / 60)
    const seconds: number = this.timeRemainingSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
  onSubmitStep2() {
    this.group2.get('verificationCode')?.setValidators([Validators.required])
    this.group2.get('verificationCode')?.updateValueAndValidity()
    if (this.group2.valid) {
      const email = this.group.value.email
      const verificationCode = this.group2.value.verificationCode

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
            })

            // this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });

            this.step2Disabled = true
            this.step3Disabled = false
            // console.log(response);
            this.activeIndex = 2
          },
          (error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 3000,
            })
          },
        )
    }
  }

  onSubmitStep3() {
    this.group3
      .get('newPassword')
      ?.setValidators([Validators.required, SignInValidator.formatPassword])
    this.group3.get('newPassword')?.updateValueAndValidity()
    this.group3
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ])
    this.group3.get('confirmPassword')?.updateValueAndValidity()

    if (this.group3.valid) {
      const email = this.group.value.email
      const verificationCode = this.group2.value.verificationCode
      const newPassword = this.group3.value.newPassword

      this.ngxService.start()

      this.authService
        .verifyCodeAndResetPassword({ email, verificationCode, newPassword })
        .pipe(
          catchError((error) => {
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 5000,
            })
            return throwError(error)
          }),
          finalize(() => {
            this.ngxService.stop()
          }),
        )
        .subscribe(
          (response) => {
            if (response) {
              this.snackBar.open(response.message, 'Cerrar', {
                duration: 5000,
              })
              this.router.navigate(['/']).then(() => {
                window.location.reload()
              })
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            })
          },
          (error) => {
            console.log(error)
            // this.snackBar.open(error.error.message, 'Cerrar', {
            //   duration: 5000,
            // });
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            })
          },
        )
    }
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value
    const confirmPassword = control.get('confirmPassword')?.value

    return password === confirmPassword ? null : { passwordMatch: true }
  }

  onConfirmPasswordInput(event: Event) {
    const confirmInput = event.target as HTMLInputElement
    const confirmPasswordControl = this.group3.get('confirmPassword')

    if (confirmPasswordControl) {
      const password = this.group3.get('newPassword')?.value
      const confirmPassword = confirmInput.value

      if (password === confirmPassword) {
        confirmPasswordControl.setErrors(null)
      } else {
        confirmPasswordControl.setErrors({ passwordMatch: true })
      }
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password'
  }
  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl
  }

  get verificationCodeFormControl(): FormControl {
    return this.group2.get('verificationCode') as FormControl
  }

  get newPasswordFormControl(): FormControl {
    return this.group3.get('newPassword') as FormControl
  }

  get confirmPasswordFormControl(): FormControl {
    return this.group3.get('confirmPassword') as FormControl
  }

  onSubmit() {
    if (this.group.valid && !this.isSubmitting) {
      // Lógica para procesar el formulario actual
      switch (this.activeIndex) {
        case 0:
          // Lógica para la primera sección (paso 1)
          // Puedes enviar el correo de verificación, etc.
          break
        case 1:
          // Lógica para la segunda sección (paso 2)
          // Puedes verificar el código de verificación, etc.
          break
        case 2:
          // Lógica para la tercera sección (paso 3)
          // Puedes restablecer la contraseña, etc.
          break
        default:
          break
      }

      // Cambiar a la siguiente sección
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
      }
    }
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl('/portal/' + route)
  }
  // redirectToHome(route: string): void {
  //   this.router.navigateByUrl('/#');
  //   window.location.reload();
  // }

  // showQuestion() {
  //   this.questionviewService.showQuestion()
  // }

  // Question() {
  //   this.pedidoviewService.hideDialog();
  // }

  navigateTo(route: string) {
    // this.dialogRef.close()
    this.router.navigateByUrl(route)
    // this.showDialog = false; // Opcional: cerrar el diálogo después de navegar
  }

  redirectToHome(route: string): void {
    this.router.navigateByUrl('/' + route).then(() => {
      window.location.reload()
    })
  }
}
