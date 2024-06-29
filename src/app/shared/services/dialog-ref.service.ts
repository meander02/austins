import { Injectable } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class DialogRefService {
  public dialogRef: DynamicDialogRef | undefined;

  setDialogRef(ref: DynamicDialogRef) {
    this.dialogRef = ref;
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
