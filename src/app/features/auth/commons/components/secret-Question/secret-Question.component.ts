import { Component, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-secret-Question-Component',
  templateUrl: './secret-Question.component.html',
  styleUrls: [
    './password-input.component.scss',
    './request-password-recoveryfrm.component.scss',
    './so.scss',
    './so01.scss',
    './so02.scss',
    './so03.scss',
    './form.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class secretQuestionComponent {
  step1Disabled = false
  showTimer: boolean = true
  timeRemainingSeconds: number = 0 // Initialize with appropriate value
  activeIndex: number = 0 // Initialize with appropriate value
  step2Disabled: boolean = false // Initialize with appropriate value
  isSubmitting: boolean = false // Initialize with appropriate value
  isUserFound: boolean = false // Nuevo flag para indicar si el usuario fue encontrado
  showEmptyFieldError: boolean = false // Nuevo flag para indicar si el usuario fue encontrado
  newPasswordFieldsVisible: boolean = false; // Agregar propiedad para controlar la visibilidad de los campos de nueva contraseña

  breadcrumbItems = [
    { label: 'Inicio', command: () => this.redirectTo('home') },
    {
      label: 'Solicitud de Recuperación de Contraseña',
      command: () => this.redirectTo('#'),
    },
  ]

  questionForm: FormGroup
  questionOptions: any[] = [
    { label: '¿Cuál es el nombre de tu primer mascota?', value: 'first_pet' },
    { label: '¿En qué ciudad naciste?', value: 'birth_city' },
    { label: '¿Cuál es tu comida favorita?', value: 'favorite_food' },
  ]

  constructor(
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private athService: AuthService,
  ) {
    this.questionForm = this.formBuilder.group({
      userType: ['email', Validators.required],
      username: ['', Validators.required],
      selectedQuestion: ['', Validators.required],
      answer: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // Implement any initialization logic here
  }

  onSubmitStep1() {
    const formData = this.questionForm.value;
  
    this.athService.verificca_respuest(formData).subscribe(
      (response) => {
        console.log(response);
        // Verificar si la respuesta del servidor indica que la pregunta y la respuesta coinciden
        if (response.success) {
          // Si coinciden, ocultar los campos de nueva contraseña
          this.newPasswordFieldsVisible = false;
          // Mostrar mensaje de éxito
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message
          });
        } else {
          // Si no coinciden, mostrar un mensaje de error al usuario
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message || 'Pregunta secreta o respuesta incorrecta'
          });
        }
      },
      (error) => {
        // Manejar el error de la solicitud HTTP
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.'
        });
        console.error(error);
      }
    );
  }
  

  navigateTo(route: string) {
    this.router.navigateByUrl(route)
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl('/portal/' + route, { skipLocationChange: true })
  }


  buscarUsuarios(query: string): void {
    this.questionForm.patchValue({
      selectedQuestion: '',
    })
    // Verificar si el campo username está vacío
    if (!query) {
      this.isUserFound = false
      this.showEmptyFieldError = true // Indicar que se ha mostrado el mensaje de error
      return // Detener la ejecución si el campo está vacío
    } else {
      this.showEmptyFieldError = false // Reiniciar el estado de la variable de error
    }

    this.athService.consultaUsuariosPorTelefonoOCorreo(query).subscribe(
      (response) => {
        console.log(response)
        if (response.length > 0) {
          this.isUserFound = true
          // Verificar si la respuesta tiene una pregunta secreta definida
          if (response[0].securityQuestion) {
            // Si la pregunta secreta está definida, establecerla en el formulario
            this.questionForm.patchValue({
              selectedQuestion: response[0].securityQuestion,
            })
            console.log(response)
          }
          // Mostrar los campos adicionales
        } else {
          this.isUserFound = false
          // Ocultar los campos adicionales
        }

      },
      (error) => {
        console.error(error)
        this.isUserFound = false
        // Ocultar los campos adicionales
      },
    )
  }
}
