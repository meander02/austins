import { Component, ElementRef, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  step: 'personal' | 'contact' | 'credentials' = 'personal';

  firstName: string = '';
  lastName: string = '';
  birthdate: string = '';
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const progressBar = this.el.nativeElement.querySelector('#progress-bar');
    const progressSteps = progressBar.querySelectorAll('.progress-step');

    function updateProgressBar(step: 'personal' | 'contact' | 'credentials') {
      progressSteps.forEach((stepElement: HTMLElement, index: number) => {
        if (index <= ['personal', 'contact', 'credentials'].indexOf(step)) {
          stepElement.classList.add('active');
        } else {
          stepElement.classList.remove('active');
        }
      });
    }

    document.addEventListener('formStepChange', (event: any) => {
      const step = event.detail.step;
      updateProgressBar(step);
    });
  }

  nextStep(targetStep: 'personal' | 'contact' | 'credentials') {
    this.step = targetStep;
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  prevStep() {
    if (this.step === 'contact') {
      this.step = 'personal';
    } else if (this.step === 'credentials') {
      this.step = 'contact';
    }
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }




  onSubmit() {
    // Aquí puedes agregar lógica para manejar el envío del formulario (no se incluye en este prototipo).
  }
}
