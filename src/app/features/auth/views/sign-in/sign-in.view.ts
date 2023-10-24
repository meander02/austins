import { Component , OnInit } from '@angular/core';
// import { SignInService } from '../../commons/services/sign-in.service';
// import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss']
})
export class SignInView implements OnInit {
  // constructor(
  //   // private signInService: SignInService,
  //   private storageService: StorageService,
  //   private router: Router,

  // ) {}
  ngOnInit(): void {}
  // signIn(data: ISingInRequest): void {
  //   debugger
  //   this.signInService.signIn(data).subscribe((Response) => {
  //     if (Response) {
  //       this.storageService.setToken(Response.token);
  //       this.router.navigateByUrl('admin/products-list')
  //     }
  //   });
  // }
}
