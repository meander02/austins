import {
  Component,
  EventEmitter,
  OnInit,
  ElementRef,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ISingInRequest } from '../../../interfaces/sign-in-request.interface';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: [
    './sign-in-form.component.scss',
    './sign-in-form.component2.scss',
    './a1.scss',
  ],
})
export class SignInFormComponent implements OnInit {
  group: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password';
  userTouchedForm = false;
  recaptchaValid = false; // Flag to track recaptcha validation
  recaptchaSHOW= true; // Flag to track recaptcha validation
  siteKey: string;

  @Output() formData: EventEmitter<ISingInRequest> =
    new EventEmitter<ISingInRequest>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private dialogRef: MatDialogRef<SignInFormComponent> // Inyecta MatDialogRef
  ) {
    // this.siteKey = '6Lc3YmEpAAAAAO6t_Qmv-NeqUApr2AJFPbnIhSeU'; localhost
    // this.siteKey = '6Lc3YmEpAAAAAO6t_Qmv-NeqUApr2AJFPbnIhSeU';

    // this.siteKey = '6LcUCGIpAAAAANGNeryg6jvmWdcJagZ7-34PY5IY'; produccion
    this.siteKey = '6LcUCGIpAAAAANGNeryg6jvmWdcJagZ7-34PY5IY';
    this.group = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      password: [''],
      recaptcha: [''],
    });
  }

  private applyValidatorsAfterInteraction() {
    const fieldsToValidate = [
      'email',
      'password',
      'recaptcha' /* Add other fields as needed */,
    ];
    fieldsToValidate.forEach((fieldName) => {
      this.applyValidatorsForField(fieldName);
    });
  }
  ngOnInit() {
    // Subscribe to value changes in the form
    this.group.valueChanges.subscribe(() => {
      this.userTouchedForm = true;
      if (this.userTouchedForm) {
        this.applyValidatorsAfterInteraction();
      }
    });
  }
  // handleRecaptchaValidation(event: any) {
  // handleRecaptchaValidation(event: any) {

  handleRecaptchaValidation(event: any): void {
    // console.log('Evento de validacion captcha:', event);

    this.recaptchaValid = event ? true : false;
    if(event){
      this.recaptchaSHOW= false;
    }
  }


  // Method to check if the form is valid
  isFormValid() {
    return this.group.valid && this.recaptchaValid;

  }
  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.group.get('password') as FormControl;
  }
  get recaptchaFormControl(): FormControl {
    return this.group.get('recaptcha') as FormControl;
  }
  private applyValidatorsForField(fieldName: string) {
    let validatorCustom = new SignInValidator();
    const control = this.group.get(fieldName);
    if (control && control.dirty && control.touched) {
      // Check if the control is both dirty and touched
      switch (fieldName) {
        case 'email':
          control.setValidators([
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ]);
          break;
        case 'password':
          control.setValidators([
            Validators.required,
            validatorCustom.formatPassword,
          ]);
          break;
        case 'recaptcha':
          control.setValidators([Validators.required]);
          break;
      }
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  goToSigUP(): void {
    this.dialogRef.close(); // Cierra el modal
    this.router.navigateByUrl('/auth/sign-up'); // Navega a la vista de registro
  }

  goToRecupera(): void {
    this.dialogRef.close(); // Cierra el modal
    this.router.navigateByUrl('/auth/Recupera'); // Navega a la vista de registro
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }
  send(): void {
    const formData = this.group.value;
    if (this.isFormValid()) {
      this.formData.emit(formData);
    }
  }
  redirectTo(route: string): void {
    this.dialogRef.close(); // Cierra el modal
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
