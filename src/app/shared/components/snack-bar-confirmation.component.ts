import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
    selector: 'snack-bar-confirmation.component',
    templateUrl: 'snack-bar-confirmation.component.html',
    styles: [],
  })
  export class SnackBarConfirmationComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
  }