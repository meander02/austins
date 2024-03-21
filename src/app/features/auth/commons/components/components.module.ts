import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessComponent } from './success/success.component';
import { RequestPasswordRecoveryfrmComponent } from './request-password-recoveryfrm/request-password-recoveryfrm.component';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { secretQuestionComponent } from './secret-Question/secret-Question.component';

@NgModule({
  declarations: [SignInFormComponent, SignUpFormComponent, SuccessComponent,RequestPasswordRecoveryfrmComponent,secretQuestionComponent],
  exports: [SignUpFormComponent, SignInFormComponent,SuccessComponent,RequestPasswordRecoveryfrmComponent,secretQuestionComponent],
  imports: [NgxCaptchaModule,
    CoreComponentsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
})
export class AuthComponentsModule {}
