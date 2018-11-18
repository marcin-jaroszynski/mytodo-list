import {Component, Input, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskService } from '../task.service';
import { Task } from '../task';
import { PopupModifyTaskComponent } from '../popup-modify-task/popup-modify-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  @Input() typeTask: string;
  @Input() titleTask: string;

  constructor(private taskService: TaskService,  private dialog: MatDialog) {}

  getTasks(): void {
    this.taskService.getList().subscribe((response) => {
      if (true === response['success']) {
        for (let i = 0; i < response['tasks'].length; i++) {
          const newTask = new Task.Builder()
            .setId(response['tasks'][i]._id)
            .setTitle(response['tasks'][i].title)
            .setContent(response['tasks'][i].content)
            .setStatus(response['tasks'][i].status)
            .setDateCreated(response['tasks'][i].created_date)
            .setDateFinished(response['tasks'][i].finished_date)
            .setDateDue(response['tasks'][i].due_date)
            .build();
          this.tasks.push(newTask);
        }
      }
    });
  }

  markTaskAsFinished(id: string): void {
    this.taskService.markAsFinished(id).subscribe(response => {
      if (true === response['success']) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (id === this.tasks[i].id) {
            this.tasks[i].date_finished = response['finished_date'];
            this.tasks[i].status = 'finished';
            break;
          }
        }
      }
    });
  }

  removeTask(id: string): void {
    this.taskService.removeTask(id).subscribe(response => {
      if (true === response['success']) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (id === this.tasks[i].id) {
            this.tasks.splice(i, 1);
            break;
          }
        }
      }
    });
  }

  editTask(id: string): void {
    console.log('Dashboard.editTask.task.id: ', id);
    for (let i = 0; i < this.tasks.length; i++) {
      if (id === this.tasks[i].id) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          task: this.tasks[i]
        };
        dialogConfig.panelClass = 'my-modal-window'; 
        this.dialog.open(PopupModifyTaskComponent, dialogConfig);
      }
    }
  }

  openDialogAddTask(): void {
    const dialogRef = this.dialog.open(PopupModifyTaskComponent, {
      panelClass: 'my-modal-window'
    });
    dialogRef.componentInstance.onAddTask.subscribe((newTask) => {
      this.tasks.push(newTask);
    });
  }

  ngOnInit() {
    this.tasks = [];
    this.typeTask = 'all';
    this.getTasks();
  }

}
