import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  step: 'personal'|'contact'|'address'|'credentials' = 'personal';

  firstName: string = '';
  lastName: string = '';
  birthdate: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  street: string = '';
  city: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const progressBar = this.el.nativeElement.querySelector('#progress-bar');
    const progressSteps = progressBar.querySelectorAll('.progress-step');

    function updateProgressBar(step: 'personal' | 'contact' | 'address' | 'credentials') {
      progressSteps.forEach((stepElement: HTMLElement, index: number) => {
        if (index <= ['personal', 'contact', 'address', 'credentials'].indexOf(step)) {
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

  nextStep(targetStep: 'personal' | 'contact' | 'credentials'|'address') {
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
    } else if (this.step === 'address') {
      this.step = 'contact';
    } else if (this.step === 'credentials') {
      this.step = 'address';
    }
    const event = new CustomEvent('formStepChange', {
      detail: { step: this.step },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }


  onSubmit() {

  }
}
