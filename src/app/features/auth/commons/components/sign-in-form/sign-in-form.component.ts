import { Component ,EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  // group: FormGroup;

  // @Output() formData: EventEmitter<ISingInRequest> =
  //   new EventEmitter<ISingInRequest>();

  // get emailFormControl(): FormControl {
  //   console.log('email');
  //   return this.group.get('email') as FormControl;
  // }
  // get passwordFormControl(): FormControl {
  //   return this.group.get('password') as FormControl;
  // }

  constructor(private forBuilder: FormBuilder) {
    // let validatorCustom= new SignInValidator()
    // this.group = this.forBuilder.group({
    //   email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    //   password: ['',[Validators.required,validatorCustom.formatPassword]],
    // });
  }

  ngOnInit(): void {}
  // send(): void {
  //   debugger;
  //   if (this.group.valid) {
  //     this.formData.emit(this.group.value);
  //   }
  // }
}
