import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../commons/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInValidator } from 'src/app/shared/validators/sign-in-validator';
import { SignUpValidator } from 'src/app/shared/validators/sign-up-validator';

@Component({
  selector: 'app-request-password-recovery',
  templateUrl: './request-password-recovery.view.html',
  styleUrl: './request-password-recovery.view.scss'
})
export class RequestPasswordRecoveryView  {




  // constructor(
  //   private questionviewService: QuestionviewService,
  //   ){

  //   }
}


