import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { SignInView } from '../../../views/sign-in/sign-in.view';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})

export class SignInFormComponent implements OnInit {
  group: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password';

  constructor(

    private router: Router,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private dialogRef: MatDialogRef<SignInFormComponent> // Inyecta MatDialogRef

  ) {
    this.group = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}


  submitForm() {
    if (this.group.valid) {
      const formData = this.group.value;
      console.log(formData);
      // Cierra el modal al enviar el formulario
      this.dialogRef.close(formData);
    }
  }

  goToSigUP(): void {
    this.dialogRef.close(); // Cierra el modal
    this.router.navigateByUrl('/auth/sign-up'); // Navega a la vista de registro
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }
}
