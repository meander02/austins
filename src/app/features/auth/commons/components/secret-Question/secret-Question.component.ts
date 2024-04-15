import { Component, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Message, MessageService } from 'primeng/api'
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
  newPasswordFieldsVisible: boolean = false // Agregar propiedad para controlar la visibilidad de los campos de nueva contraseña
  isLoading: boolean = false
  mesaaje: string = ''
  // messages: Message[] | undefined;
  messages: Message[] = []
  // <form [formGroup]="form2">
  form2: FormGroup
  // isSubmitting = false;
  userId: string = ''; // Variable para almacenar el ID del usuario

  breadcrumbItems = [
    {
      label: 'Inicio',
      command: () => {
        this.redirectToHome('home')
      },
    },
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
    this.form2 = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // Implement any initialization logic here
  }

  onSubmitStep1() {
    const formData = this.questionForm.value
    console.log(formData)
    this.athService.verificca_respuest(formData).subscribe(
      (response) => {
        console.log(response)
        this.userId = response.user._id;

        // Verificar si la respuesta del servidor indica que la pregunta y la respuesta coinciden
        if (response.success) {
          // Si coinciden, ocultar los campos de nueva contraseña
          this.newPasswordFieldsVisible = true
          // Mostrar mensaje de éxito
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message,
          })
        } else {
          // Si no coinciden, mostrar un mensaje de error al usuario
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message || ' respuesta incorrecta',
          })
        }
      },
      (error) => {
        // Manejar el error de la solicitud HTTP
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.error.message ||
            'Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.',
        })
        console.error(error)
      },
    )
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
      this.isLoading = false // Ocultar el spinner de carga después de recibir la respuesta
      this.isUserFound = false
      this.showEmptyFieldError = true // Indicar que se ha mostrado el mensaje de error
      return // Detener la ejecución si el campo está vacío
    } else {
      this.showEmptyFieldError = false // Reiniciar el estado de la variable de error
    }
    this.isLoading = true // Mostrar el spinner de carga
    this.athService.consultaUsuariosPorTelefonoOCorreo(query).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          // Procesar la respuesta exitosa
          this.isUserFound = true
          if (response[0].securityQuestion) {
            this.questionForm.patchValue({
              selectedQuestion: response[0].securityQuestion,
            })
          }
        } else {
          // Manejar el caso de error
          this.isUserFound = false
          // Verificar si la respuesta es un objeto de error
          if (response && response.message) {
            console.error(response.message)
            // this.mesaaje=response.message
            // { severity: 'error', summary: 'Error', detail: 'Message Content' },

            this.messages = [
              { severity: 'error', summary: 'Error', detail: response.message },
            ]
            setTimeout(() => {
              this.messages = [] // Después de 5 segundos, borra los mensajes
            }, 2000)
  
          }
        }
        this.isLoading = false // Ocultar el spinner de carga después de recibir la respuesta
      },
      (error) => {
        // Manejar el error de la solicitud
        console.error(error)

        this.messages = [
          { severity: 'error', summary: 'Error', detail: error.error.message },
        ]

        this.isLoading = false // Ocultar el spinner de carga después de recibir la respuesta
        this.isUserFound = false
        // Ocultar los campos adicionales u otra acción necesaria
      },
    )
  }

  redirectToHome(route: string): void {
    this.router.navigateByUrl('/' + route).then(() => {
      window.location.reload()
    })
  }

  // cambiarContrasena() {
  //   if (this.form2.valid) {
  //     const newPassword = this.form2.value.newPassword
  //     const confirmPassword = this.form2.value.confirmPassword
  //     console.log(confirmPassword, 's')
  //     console.log(newPassword)
  //     if (newPassword === confirmPassword) {
  //       this.isSubmitting = true
  //       this.athService.cambiarContrasena_(newPassword).subscribe(
  //         () => {
  //           // Contraseña cambiada exitosamente
  //           this.isSubmitting = false
  //         },
  //         (error) => {
  //           // Manejar errores
  //           this.isSubmitting = false
  //         },
  //       )
  //     } else {
  //       // Mostrar mensaje de error si las contraseñas no coinciden
  //     }
  //   }
  // }
  cambiarContrasena() {

    console.log(this.userId)
    if (this.form2.valid && this.userId) {
      const newPassword = this.form2.value.newPassword;
      const confirmPassword = this.form2.value.confirmPassword;
  
      if (newPassword === confirmPassword) {
        this.isSubmitting = true;
  
        // Crear un objeto formData con los datos necesarios para cambiar la contraseña
        const formData = {
          userId: this.userId,
          newPassword: newPassword
        };
  
        // Llamar al método cambiarContrasena_ del servicio AuthService
        this.athService.cambiarContrasena_(formData).subscribe(
          () => {
            // Contraseña cambiada exitosamente
            this.isSubmitting = false;
          },
          (error) => {
            // Manejar errores
            this.isSubmitting = false;
          }
        );
      } else {
        // Mostrar mensaje de error si las contraseñas no coinciden
      }
    }
  }
  
}


