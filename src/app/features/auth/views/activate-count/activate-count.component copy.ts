// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
// import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';

// @Component({
//   selector: 'app-activate-count',
//   templateUrl: './activate-count.component.html',
//   styleUrls: ['./activate-count.component.scss']
// })
// export class ActivateCountComponent implements OnInit {
//   token: string = '';
//   error: string = '';
//   activateAccountForm: FormGroup;

//   constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
//     this.activateAccountForm = this.fb.group({
//       password: ['', [Validators.required, SignInValidator.formatPassword]],
//       confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
//     });
//   }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const token = params.get('token');
//       if (token) {
//         this.token = token;
//         console.log('Token recibido:', this.token);
//       } else {
//         console.log('No se recibió token');
//       }
//     });
//   }

//   passwordMatchValidator(control: FormControl): ValidationErrors | null {
//     const password = this.activateAccountForm?.get('password')?.value;
//     const confirmPassword = control.value;
//     return password === confirmPassword ? null : { passwordMatch: true };
//   }

//   onConfirmPasswordInput(event: Event) {
//     const confirmInput = event.target as HTMLInputElement;
//     const confirmPasswordControl = this.activateAccountForm.get('confirmPassword');

//     if (confirmPasswordControl) {
//       const password = this.activateAccountForm.get('password')?.value;
//       const confirmPassword = confirmInput.value;

//       if (password === confirmPassword) {
//         confirmPasswordControl.setErrors(null);
//       } else {
//         confirmPasswordControl.setErrors({ passwordMatch: true });
//       }
//     }
//   }

//   activateAccount() {
//     if (this.activateAccountForm.valid) {
//       const password = this.activateAccountForm.get('password')?.value;
//       this.http.post<any>(`${environment.api}/auth/activate`, { token: this.token, password })
//         .subscribe(
//           () => {
//             alert('¡Cuenta activada correctamente!');
//           },
//           error => {
//             this.error = error.message || 'Error al activar la cuenta.';
//             alert(this.error);
//           }
//         );
//     }
//   }
// }
