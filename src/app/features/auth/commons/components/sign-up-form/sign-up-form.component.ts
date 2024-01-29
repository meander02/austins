import { Component, ElementRef, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', './materror.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  userTouchedForm = false;
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
  ) {
    const signInValidator = new SignInValidator();
    const signUpValidator = new SignUpValidator();

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.group = this.formBuilder.group({
      name: ['', ],
      maternalLastname: ['',  ],
      paternalLastname: ['', ],
      birthdate: ['', ],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      phone: ['', [Validators.required, signUpValidator.formatPhone]],
      password: ['', [Validators.required, signInValidator.formatPassword]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
    });
  }

  ngOnInit() {
    const progressBar = this.el.nativeElement.querySelector('#progress-bar');
    const progressSteps = progressBar.querySelectorAll('.progress-step');

    function updateProgressBar(step: 'personal' | 'contact' | 'credentials') {
      progressSteps.forEach((stepElement: HTMLElement, index: number) => {
        if (index <= ['personal', 'contact', 'credentials'].indexOf(step)) {
          stepElement.classList.add('active');
        } else {
          stepElement.classList.remove('active');
        }
      });
    }

    document.addEventListener('formStepChange', (event: any) => {
      const step = event.detail.step;
      updateProgressBar(step);
    });

    this.group.valueChanges.subscribe(() => {
      this.userTouchedForm = true;
      if (this.userTouchedForm) {
        this.applyValidatorsAfterInteraction();
      }
    });

    this.securityQuestionFormControl.valueChanges.subscribe(() => {
      this.onSecurityQuestionChange();
    });
  }

  private applyValidatorsForField(fieldName: string) {
    const control = this.group.get(fieldName);

    if (control && control.dirty && control.touched) { // Check if the control is both dirty and touched
      switch (fieldName) {
        case 'name':
          case 'paternalLastname':
            control.setValidators([Validators.required, SignUpValidator.isValidName]);
            break;
        case 'maternalLastname':
        case 'paternalLastname':
          control.setValidators([Validators.required, SignUpValidator.isValidLastName]);
          break;
        case 'birthdate':
          control.setValidators([Validators.required, SignUpValidator.isValidDate]);
          break;
        // Add cases for other fields as needed
      }
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  private applyValidatorsAfterInteraction() {
    const fieldsToValidate = ['name', 'maternalLastname', 'paternalLastname', 'birthdate', /* Add other fields as needed */];
    fieldsToValidate.forEach((fieldName) => {
      this.applyValidatorsForField(fieldName);
    });
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

  nextStep(targetStep: 'personal' | 'contact' | 'credentials') {
    this.step = targetStep;
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
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
