import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface ConfirmatioData {

}

@Component({
    selector: 'confirmation-dialog.component',
    templateUrl: 'confirmation-dialog.component.html',
  })
  export class ConfirmationDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ConfirmatioData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  