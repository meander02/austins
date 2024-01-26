import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { SignInView } from '../../../views/sign-in/sign-in.view';

@Component({
  selector: 'app-success-form',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {


  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Ruta actual:', event.url);
        // this.currentRoute = event.url;
      }
    });
    // this.cartService.itemsInCart.subscribe((value) => {
    //   this.badge = value;
    // });
  }
  ngOnInit(): void {
    // this.badge=this.cartService.itemsInCart

  }

  openSignInModal(): MatDialogRef<SignInView> {
    const isMobile = window.innerWidth < 480;

    const dialogRef = this.dialog.open(SignInView, {
      width: isMobile ? '120vw' : '460px',
      height: isMobile ? 'auto' : 'auto',
      maxWidth: isMobile ? 'auto' : 'auto',
      maxHeight: isMobile ? 'auto' : '100vh',
      panelClass: isMobile
        ? ['mat-dialog', 'no-padding', 'mobile-dialog']
        : ['mat-dialog', 'no-padding', 'web-dialog'],
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal cerrado', result);
    });

    return dialogRef;
  }

}
