import { Component, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// import { MatDialog } from '@angular/material/dialog';
import { PoliticaPrivView } from '../../../features/portal/views/politica-priv/politica-priv.view';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.scss']
})
export class PoliticaComponent {
  isPrivacyPolicyVisible = true;
  dialogRef: MatDialogRef<PoliticaPrivView> | undefined;
  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  openPrivacyPolicy() {
    this.isPrivacyPolicyVisible = true; // Mostrar el contenedor
    const dialogRef = this.dialog.open(PoliticaPrivView, {
      width: '70%',
      height: '70%'
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

