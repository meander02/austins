import { Component, OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  group: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password'; // Usaremos esto para alternar entre 'password' y 'text'

  constructor(private router: Router, private formBuilder: FormBuilder,private el: ElementRef) {
    this.group = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.group.valid) {
      const formData = this.group.value;
      console.log(formData); // Puedes ver los datos en la consola
    }
  }
  goToSigUP(): void {
    this.router.navigateByUrl('/auth/sign-up');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

}
