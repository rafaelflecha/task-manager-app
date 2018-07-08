import { Component, OnInit } from '@angular/core';

import { Task } from '../models/home.tasks.interface';
import { DashboardService } from '../services/dashboard.service';
import {MatDialog } from '@angular/material';
import { TaskDialog } from './home.task-dialog.component'
import { ConfirmationDialog } from '../../shared/components/confirmation-dialog.component';
import { TaskDetailsDialog } from './home.task-details-dialog.component'
import { MatSnackBar } from '@angular/material';
import { SnackBarConfirmationComponent } from '../../shared/components/snack-bar-confirmation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string;
  description: string = "";
  taskToAdd: Task;
  tasks: Task[];
  checked = false;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '250px',
       data: {title: this.title, description: this.description, action: "Adicionar"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskToAdd = result
      if (this.taskToAdd != undefined && this.taskToAdd.title != "") {
        this.dashboardService.postTask(this.taskToAdd)
        .subscribe((task: Task) => {
          this.tasks.push(task);

          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: 'Tarefa adicionada com sucesso!',
            duration: 1000,
          });
        },
        error => {
          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: error,
            duration: 1000,
          });
        });;
      }
    });
  }

  openTaskDetailsDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDetailsDialog, {
      width: '400px',
       data: task
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  openTaskToEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '250px',
       data: {title: task.title, description: task.description, action: "Atualizar", taskId: task.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskToAdd = result
      if (this.taskToAdd != undefined && this.taskToAdd.title != "") {
        this.dashboardService.putTask(this.taskToAdd, result.taskId)
        .subscribe((response) => {

          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: 'Tarefa atualizada com sucesso!',
            duration: 1000,
          });

          this.ngOnInit()
        },
        error => {
          
          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: error,
            duration: 1000,
          });
        });;
      }
    });
  }

  openConfirmationDialog(taskId): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
       data: {action: "Deletar", description: "Deseja realmente deletar a tarefa "+taskId+" ?", taskId: taskId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        this.dashboardService.deleteTask(result.taskId)
        .subscribe((response) => {
          if (response.status = 200) {
            
            this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
              data: 'Tarefa excluída com sucesso!',
              duration: 1000,
            });

            this.ngOnInit();
          }
        },
        error => {
          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: error,
            duration: 1000,
          });
        });;
      }
    });
  }



  toggleIsComplete(event, task: Task) {
    
    task.isCompleted = event.checked;
    var text = "";

    if (task.isCompleted) {
      text = 'Tarefa concluída!';
    } else {
      text = 'Tarefa não concluída!';
    }
    

    this.dashboardService.putTask(task, task.id)
        .subscribe((response) => {

          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: text,
            duration: 500,
          });

          this.ngOnInit()
        },
        error => {
          this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
            data: error,
            duration: 1000,
          });
        });;
  }

  ngOnInit() {

    this.dashboardService.getAllTasks()
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(this.tasks);
    },
    error => {
      this.snackBar.openFromComponent(SnackBarConfirmationComponent, {
        data: error,
        duration: 1000,
      });
    });
  }
}
