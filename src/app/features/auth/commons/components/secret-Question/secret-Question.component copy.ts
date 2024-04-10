// import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
// import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';
// import { AuthService } from '../../services/auth.service';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   ValidationErrors,
//   Validators,
// } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { catchError, finalize, throwError } from 'rxjs';

// @Component({
//   selector: 'app-secret-Question-Component',
//   templateUrl: './secret-Question.component.html',
//   styleUrls: [
//     './password-input.component.scss',
//     './request-password-recoveryfrm.component.scss',
//     './so.scss',
//     './so01.scss',
//     './so02.scss',
//     './so03.scss',
//     './form.scss',
//   ],
//   encapsulation: ViewEncapsulation.None,
//   providers: [MessageService],
// })
// export class secretQuestionComponent {
//   // breadcrumbItems: any[] = [
//   //   { label: 'Inicio', routerLink: ['/'] },
//   //   { label: 'Recuperación de Contraseña' }
//   // ];
//   breadcrumbItems = [
//     { label: 'Inicio', command: () => { this.redirectTo('home') },},
//     { label: 'Solicitud de Recuperación de Contraseña', command: () => { this.redirectTo('#') }, },
//   ];





//   step1Disabled = false;
//   showTimer: boolean = true;
//   timeRemainingSeconds: number = 0; // Initialize with appropriate value
//   activeIndex: number = 0; // Initialize with appropriate value
//   step2Disabled: boolean = false; // Initialize with appropriate value
//   isSubmitting: boolean = false; // Initialize with appropriate value

//   questionForm: FormGroup;
//   // questionForm: FormGroup;

//   constructor(     private router: Router,private formBuilder: FormBuilder) {
//     this.questionForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       question: ['', Validators.required],
//       answer: ['', Validators.required],
//       selectedQuestion: ['', Validators.required]
//     });
//   }
//   questionOptions: any[] = [
//     { label: '¿Cuál es el nombre de tu primer mascota?', value: 'first_pet' },
//     { label: '¿En qué ciudad naciste?', value: 'birth_city' },
//     { label: '¿Cuál es tu comida favorita?', value: 'favorite_food' }
//   ];

//   ngOnInit(): void {
//     // Implement any initialization logic here
//   }
//   onSubmitStep1() {}
//   onSubmitStep2() {
//     // Implement onSubmitStep2 logic here
//   }

//   navigateTo(route: string) {
//     // this.dialogRef.close()
//     this.router.navigateByUrl(route);
//     // this.showDialog = false; // Opcional: cerrar el diálogo después de navegar
//   }



//   redirectTo(route: string): void {
//     // Comenté las líneas que no estaban siendo utilizadas
//     // console.log('Redirecting...');
//     // this.closePrivacyCookies();

//     // Utilizo el objeto ActivatedRoute para obtener la ruta activa y evitar la recarga de la página
//     this.router.navigateByUrl('/portal/' + route, { skipLocationChange: true }).then(() => {
//       // window.location.reload() solo se ejecutará después de que la navegación se haya completado
//       // window.location.reload();
//     });
//   }

// }
