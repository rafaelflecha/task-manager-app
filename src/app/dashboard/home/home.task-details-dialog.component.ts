import {Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Task} from '../models/home.tasks.interface'

@Component({
    selector: 'home.task-details-dialog.component',
    templateUrl: 'home.task-details-dialog.component.html',
  })
  export class TaskDetailsDialog {
  
    constructor(
      public dialogRef: MatDialogRef<TaskDetailsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Task) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  