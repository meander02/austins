import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-open-delete-confirmation',
  templateUrl: './open-delete-confirmation.component.html',
  styleUrls: ['./open-delete-confirmation.component.scss']
})
export class OpenDeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<OpenDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }

  closeDialog(): void {
    this.dialogRef.close('cancel');
  }
}
