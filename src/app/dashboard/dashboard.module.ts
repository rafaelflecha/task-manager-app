import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';

import { routing } from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { DashboardService } from './services/dashboard.service';

import { AuthGuard } from '../auth.guard';
import { TaskDialog } from './home/home.task-dialog.component';
import { ConfirmationDialog } from '../shared/components/confirmation-dialog.component';
import { TaskDetailsDialog } from './home/home.task-details-dialog.component';

import { SnackBarConfirmationComponent } from '../shared/components/snack-bar-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
  ],
  declarations: [RootComponent, HomeComponent, TaskDialog, ConfirmationDialog, SnackBarConfirmationComponent, TaskDetailsDialog],
  exports: [],
  entryComponents: [TaskDialog, ConfirmationDialog, TaskDetailsDialog, SnackBarConfirmationComponent],
  providers: [AuthGuard, DashboardService]
})
export class DashboardModule { }
