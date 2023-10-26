import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  group: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder) {
    this.group = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.group.valid) {
      // Realiza la acción deseada cuando el formulario es válido
      // Por ejemplo, envía los datos de inicio de sesión al servidor
      const formData = this.group.value;
      console.log(formData); // Puedes ver los datos en la consola
    }
  }
  goToSigUP(): void{
    this.router.navigateByUrl('/auth/sign-up')
  }
}
