import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PoliticaPrivView } from '../../../features/portal/views/politica-priv/politica-priv.view';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1600ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('dialogFadeInOut', [
      state('void', style({ transform: 'scale(0.5)', opacity: 0 })),
      transition(':enter', [
        animate('2000ms ease-in', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class PoliticaComponent {
  isPrivacyPolicyVisible = true;
  dialogRef: MatDialogRef<PoliticaPrivView> | undefined;

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  openPrivacyPolicy() {
    this.isPrivacyPolicyVisible = true; // Mostrar el contenedor
    const dialogRef = this.dialog.open(PoliticaPrivView, {
      width: '80%',
      height: '70%',
      panelClass: 'dialog-with-animation', // Clase para aplicar animación
    });

    dialogRef.afterOpened().subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  closePrivacyPolicy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.isPrivacyPolicyVisible = false;
  }
}
