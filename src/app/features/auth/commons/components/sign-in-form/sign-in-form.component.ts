import { Component,EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Output() formData: EventEmitter<ISingInRequest> =
  new EventEmitter<ISingInRequest>();

  constructor(

    private router: Router,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private dialogRef: MatDialogRef<SignInFormComponent> // Inyecta MatDialogRef

  ) {

    this.group = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  private applyValidatorsAfterInteraction() {
    const fieldsToValidate = [
      'email',
      'password',
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

  }
  get emailFormControl(): FormControl {
    return this.group.get('email') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.group.get('password') as FormControl;
  }
  private applyValidatorsForField(fieldName: string) {
    let validatorCustom= new SignInValidator()
    const control = this.group.get(fieldName);
    if (control && control.dirty && control.touched) {
      // Check if the control is both dirty and touched
      switch (fieldName) {
        case 'email':
          control.setValidators([
            Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]);
          break;
        case 'password':
          control.setValidators([
            Validators.required,validatorCustom.formatPassword
          ]);
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
    // debugger;
    const formData = this.group.value;
    if (this.group.valid) {
      this.formData.emit(this.group.value);
    }
  }

  redirectTo(route: string): void {
    this.dialogRef.close(); // Cierra el modal
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
