import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-open-delete-confirmation',
  templateUrl: './open-delete-confirmation.component.html',
  styleUrls: ['./open-delete-confirmation.component.scss']
})
export class OpenDeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<OpenDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}
  confirmDelete(): void {
    this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close('confirm');
  }
  closeDialog(): void {
    this.dialogRef.close('cancel');
  }
}
