import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Task} from '../models/home.tasks.interface'

@Component({
    selector: 'home.task-dialog.component',
    templateUrl: 'home.task-dialog.component.html',
  })
  export class TaskDialog {
  
    buttonDisabled: boolean;

    enableButton(title){
        if (title != undefined && title !== "") {
            this.buttonDisabled = true
        } else {
            this.buttonDisabled = false
        }
      }

    constructor(
      public dialogRef: MatDialogRef<TaskDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Task) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  