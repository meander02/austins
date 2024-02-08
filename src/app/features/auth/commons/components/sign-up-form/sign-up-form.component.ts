import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss',
   './materror.component.scss',
   './form-up.component.scss',
   './up.scss',
   './up02.scss',
   './up03.scss'
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  siteKey: string;
  items: MenuItem[] = [
    { label: 'personal' },
    { label: 'contact' },
    { label: 'credentials' },
  ];
  activeIndex = 0;
  userTouchedForm = false;
  breadcrumbItems = [
    { label: 'Inicio', url: '#' },
    { label: 'sign-up', url: '/signup' },
  ];

  preguntasSecretas: string[] = [
    '¿Cuál es tu color favorito?',
    '¿Cuál es el nombre de tu mascota?',
    '¿En qué ciudad naciste?',
    // Agrega más preguntas según sea necesario
  ];

  isSubmitting = false;
  group: FormGroup;
  step: 'personal' | 'contact' | 'credentials' = 'personal';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
    private messageService: MessageService
  ) {
    const signInValidator = new SignInValidator();
    const signUpValidator = new SignUpValidator();
    // this.siteKey = '6Lc3YmEpAAAAAO6t_Qmv-NeqUApr2AJFPbnIhSeU'; localhost

    // this.siteKey = '6LcUCGIpAAAAANGNeryg6jvmWdcJagZ7-34PY5IY'; produccion
    this.siteKey = '6LcUCGIpAAAAANGNeryg6jvmWdcJagZ7-34PY5IY';
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.group = this.formBuilder.group({
      name: [''],
      maternalLastname: [''],
      paternalLastname: [''],
      birthdate: [''],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      phone: ['', [Validators.required, signUpValidator.formatPhone]],
      password: ['', [Validators.required, signInValidator.formatPassword]],
      confirmPassword: [
        '',
        [Validators.required, this.passwordMatchValidator.bind(this)],
      ],
      recaptcha: ['', Validators.required],
    });
  }

  nextStep(targetStep: 'personal' | 'contact' | 'credentials') {
    // Actualizar el índice activo
    this.activeIndex = ['personal', 'contact', 'credentials'].indexOf(
      targetStep
    );
    const event = new CustomEvent('formStepChange', {
      detail: { step: targetStep },
      bubbles: true,
    });
    document.dispatchEvent(event);
    this.step = targetStep; // Agregar esta línea para mantener la propiedad 'step' actualizada
  }

  prevStep() {
    if (this.step === 'contact') {
      this.step = 'personal';
    } else if (this.step === 'credentials') {
      this.step = 'contact';
    }
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  private applyValidatorsAfterInteraction() {
    const fieldsToValidate = [
      'name',
      'maternalLastname',
      'paternalLastname',
      'birthdate',
      'recaptcha' /* Add other fields as needed */,
    ];
    fieldsToValidate.forEach((fieldName) => {
      this.applyValidatorsForField(fieldName);
    });
  }

  ngOnInit() {
    this.group.valueChanges.subscribe(() => {
      this.userTouchedForm = true;
      if (this.userTouchedForm) {
        // console.log("click")
        this.applyValidatorsAfterInteraction();
      }
    });
    this.securityQuestionFormControl.valueChanges.subscribe(() => {
      this.onSecurityQuestionChange();
    });
  }

  handleSuccess(event: any): void {
    this.group.markAllAsTouched();

    Object.keys(this.group.controls).forEach((key) => {
      const controlErrors = this.group.get(key)?.errors;
      if (controlErrors != null || controlErrors != undefined) {
        // console.log(controlErrors);
        console.log('reCAPTCHA success:', controlErrors);
        if (controlErrors['required'] != true) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              controlErrors['formatError'] ||
              controlErrors['invalidDate'] ||
              controlErrors['invalidLastName'] ||
              controlErrors['invalidName'],

          });

          this.snackBar.open(
            `Error en el campo ${key}:` + controlErrors['formatError'] ||
              controlErrors['invalidDate'] ||
              controlErrors['invalidLastName'] ||
              controlErrors['invalidName'],
            'Cerrar',
            {
              duration: 3000,
            }
          );
        }
      }
    });
  }

  private applyValidatorsForField(fieldName: string) {
    const control = this.group.get(fieldName);

    if (control && control.dirty && control.touched) {
      // Check if the control is both dirty and touched
      switch (fieldName) {
        case 'name':
          control.setValidators([
            Validators.required,
            SignUpValidator.isValidName,
          ]);
          break;
        case 'maternalLastname':
          control.setValidators([
            Validators.required,
            SignUpValidator.isValidLastName,
          ]);
          break;
        case 'paternalLastname':
          control.setValidators([
            Validators.required,
            SignUpValidator.isValidLastName,
          ]);
          break;
        case 'birthdate':
          control.setValidators([
            Validators.required,
            SignUpValidator.isValidDate,
          ]);
          break;
        case 'recaptcha':
          control.setValidators([Validators.required]);
          break;
        // Add cases for other fields as needed
      }
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  passwordMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMatch: true };
  }

  onConfirmPasswordInput(event: Event) {
    const confirmInput = event.target as HTMLInputElement;
    const confirmPasswordControl = this.group.get('confirmPassword');

    if (confirmPasswordControl) {
      const password = this.group.get('password')?.value;
      const confirmPassword = confirmInput.value;

      if (password === confirmPassword) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ passwordMatch: true });
      }
    }
  }

  get nameFormControl(): FormControl {
    return this.group.get('name') as FormControl;
  }

  get a1(): FormControl {
    return this.group.get('maternalLastname') as FormControl;
  }

  get a2(): FormControl {
    return this.group.get('paternalLastname') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.group.get('password') as FormControl;
  }

  get confirmPasswordFormControl(): FormControl {
    return this.group.get('confirmPassword') as FormControl;
  }

  get phoneFormControl(): FormControl {
    return this.group.get('phone') as FormControl;
  }

  get securityQuestionFormControl(): FormControl {
    return this.group.get('securityQuestion') as FormControl;
  }

  get securityAnswerFormControl(): FormControl {
    return this.group.get('securityAnswer') as FormControl;
  }

  get recaptchaFormControl(): FormControl {
    return this.group.get('recaptcha') as FormControl;
  }

  onSecurityQuestionChange() {
    this.securityAnswerFormControl.reset('');
  }

  onPhoneInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const phoneControl = this.group.get('phone');

    if (phoneControl) {
      const maxLength = 10;
      const trimmedValue = inputElement.value.slice(0, maxLength);

      inputElement.value = trimmedValue;
      phoneControl.setValue(trimmedValue);
    }
  }
  onSubmit() {
    this.group.markAllAsTouched();
    Object.keys(this.group.controls).forEach((key) => {
      const controlErrors = this.group.get(key)?.errors;
      if (controlErrors != null) {
        // console.log(controlErrors);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            controlErrors['formatError'] ||
            controlErrors['invalidDate'] ||
            controlErrors['invalidLastName'] ||
            controlErrors['invalidName'],
          // controlErrors['passwordMismatch'],
        });

        this.snackBar.open(
          `Error en el campo ${key}:` + controlErrors['formatError'] ||
            controlErrors['invalidDate'] ||
            controlErrors['invalidLastName'] ||
            controlErrors['invalidName'],
          // controlErrors['passwordMismatch'],
          'Cerrar',
          {
            duration: 3000,
          }
        );
      }
    });

    if (this.group.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      this.authService
        .signUpAndVerifyEmail(this.group.value)
        .subscribe(
          (response) => {
            this.snackBar.open(response.message, 'Cerrar', {
              duration: 3000,
            });

            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
            this.router.navigate([
              '/auth/user-create',
              { userEmail: this.group.value.email },
            ]);
          },
          (error) => {
            const errorMessage = error.error.message || 'Error en el servidor';
            this.snackBar.open(errorMessage, 'Cerrar', {
              duration: 3000,
            });
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,

              // controlErrors['passwordMismatch'],
            });
          }
        )
        .add(() => {
          this.isSubmitting = false;
        });
    }
  }

  arePersonalFieldsFilled(): boolean {
    return (
      this.group.get('name')?.value &&
      this.group.get('maternalLastname')?.value &&
      this.group.get('paternalLastname')?.value &&
      this.group.get('birthdate')?.value
    );
  }

  areContactFieldsFilled(): boolean {
    return (
      this.group.get('securityQuestion')?.value &&
      this.group.get('securityAnswer')?.value &&
      this.group.get('phone')?.value
    );
  }

  areCredentialFieldsFilled(): boolean {
    return (
      this.group.get('email')?.value &&
      this.group.get('password')?.value &&
      this.group.get('confirmPassword')?.value
    );
  }
}
