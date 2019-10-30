import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskService } from '../task.service';
import { Task } from '../task';
import { PopupRemoveTaskComponent } from '../popup-remove-task/popup-remove-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Output() eventFinished = new EventEmitter();
  @Output() eventRemove = new EventEmitter();
  @Output() eventEdit = new EventEmitter();
  @Input() task: Task;
  @Input() taskTitle: string;
  mode: string;

  constructor(private taskService: TaskService,  private dialog: MatDialog) { }

  markTaskAsFinished() {
    if (!this.taskTitle) {
      this.taskTitle = this.task.title;
      alert('You cant type empty title of task!');
      return;
    }
    this.switchToReadMode();
    this.eventFinished.emit(this.task.id);
  }

  removeTask() {
    this.eventRemove.emit(this.task.id);
  }

  editTask() {
    this.eventEdit.emit(this.task.id);
  }

  editMode(): void {
    this.mode = 'edit';
  }

  edit(): void {
    let newTitle = this.taskTitle.trim();
    if (!newTitle) {
      alert('Title of task cannot be empty!');
      return;
    }
    this.task.title = newTitle;
    this.taskService.editTask(this.task).subscribe(response => {
      if (true === response['success']) {
        this.switchToReadMode();
      }
    });
  }

  isReadMode(): boolean {
    return this.mode == 'read' ? true : false;
  }

  ngOnInit() {
  	this.switchToReadMode();
    this.taskTitle = this.task.title;
  }

  switchToReadMode() {
    this.mode = 'read';
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: this.task.title
    };
    const dialogRef = this.dialog.open(PopupRemoveTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if ('yes' === response) {
        this.removeTask();
      }
    });
  }

}
