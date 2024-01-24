import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  // En tu componente
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
    private authService: AuthService, // Inyecta tu servicio AuthService,
    private el: ElementRef,
    private formBuilder: FormBuilder,
  ) {
    // Instancia de validadores personalizados
    let signInValidator = new SignInValidator();
    let signUpValidator = new SignUpValidator();

    // Expresión regular para validar el campo de correo electrónico
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // Inicialización del formulario con sus campos y validadores
    this.group = this.formBuilder.group({
      name: ['', [Validators.required, SignUpValidator.isValidName]],
      maternalLastname: ['', [Validators.required, SignUpValidator.isValidLastName]],
      paternalLastname: ['', [Validators.required, SignUpValidator.isValidLastName]],
      birthdate: ['', [Validators.required, SignUpValidator.isValidDate]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          signUpValidator.formatPhone,
        ]],
      username: ['', Validators.required],
      password: ['', [Validators.required, signInValidator.formatPassword]],
      confirmPassword: [''],


    });
    this.group.get('confirmPassword')?.setValidators([Validators.required, this.passwordMatchValidator.bind(this.group)]);

  }
   // Función de validación personalizada para comparar contraseñas
   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; // Contraseñas coinciden
    } else {
      return { 'passwordMatch': true }; // Contraseñas no coinciden
    }
  }
  // Agrega este método a tu componente
onConfirmPasswordInput(event: Event) {
  const confirmInput = event.target as HTMLInputElement;
  const confirmPasswordControl = this.group.get('confirmPassword');

  if (confirmPasswordControl) {
    const password = this.group.get('password')?.value;
    const confirmPassword = confirmInput.value;

    if (password === confirmPassword) {
      confirmPasswordControl.setErrors(null); // Contraseñas coinciden
    } else {
      confirmPasswordControl.setErrors({ 'passwordMatch': true }); // Contraseñas no coinciden
    }
  }
}

  ngOnInit() {
    // Función para actualizar la barra de progreso
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

    // Escucha del cambio de paso en el formulario
    document.addEventListener('formStepChange', (event: any) => {
      const step = event.detail.step;
      updateProgressBar(step);
    });
    this.securityQuestionFormControl.valueChanges.subscribe(() => {
      this.onSecurityQuestionChange();
    });
  }

  // Avanza al siguiente paso del formulario
  nextStep(targetStep: 'personal' | 'contact' | 'credentials') {
    this.step = targetStep;
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  // Retrocede al paso anterior del formulario
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

  // Accesor para obtener el control del email
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

  // Accesor para obtener el control de la contraseña
  get passwordFormControl(): FormControl {
    return this.group.get('password') as FormControl;
  }

  // Accesor para obtener el control de la confirmación de contraseña
  get confirmPasswordFormControl(): FormControl {
    return this.group.get('confirmPassword') as FormControl;
  }
  get phoneFormControl(): FormControl {
    return this.group.get('phone') as FormControl;
  }

get securityQuestionFormControl(): FormControl {
  return this.group.get('securityQuestion') as FormControl;
}

// Obtén el control de la respuesta secreta
get securityAnswerFormControl(): FormControl {
  return this.group.get('securityAnswer') as FormControl;
}

// Añade la lógica para reiniciar la respuesta cuando cambie la pregunta
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
  // Evitar múltiples envíos al agregar un bloqueo
  if (!this.isSubmitting) {
    this.isSubmitting = true;

    this.authService.signUpAndVerifyEmail(this.group.value).subscribe(
      (response) => {
        console.log('Respuesta del backend:', response.message);

        this.snackBar.open(response.message, 'Cerrar', {
          duration: 3000,
        });
        // Manejar la respuesta del backend según sea necesario
      },
      (error) => {
        // console.error('Error del backend:', error);

        // Verificar si el error tiene un mensaje personalizado desde el servidor
        const errorMessage = error.error.message || 'Error en el servidor';

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
        });
        // Manejar los errores del backend según sea necesario
      }
    ).add(() => {
      // Restaurar el estado del bloqueo después de la respuesta o error del backend
      this.isSubmitting = false;
    });
  }
}


}
