import { Component,EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ISingInRequest } from '../../../interfaces/sign-in-request.interface';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})

export class SignInFormComponent implements OnInit {
  group: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password';
  @Output() formData: EventEmitter<ISingInRequest> =
  new EventEmitter<ISingInRequest>();

  constructor(

    private router: Router,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private dialogRef: MatDialogRef<SignInFormComponent> // Inyecta MatDialogRef

  ) {
    let validatorCustom= new SignInValidator()
    this.group = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',[Validators.required,validatorCustom.formatPassword]],
    });
  }

  ngOnInit(): void {}

  get emailFormControl(): FormControl {
    console.log('email');
    return this.group.get('email') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.group.get('password') as FormControl;
  }


  goToSigUP(): void {
    this.dialogRef.close(); // Cierra el modal
    this.router.navigateByUrl('/auth/sign-up'); // Navega a la vista de registro
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
  // this.dialogRef.close(formData);
  redirectTo(route: string): void {
    console.log('redirect');
    this.router.navigateByUrl('/portal/' + route);
  }
}
