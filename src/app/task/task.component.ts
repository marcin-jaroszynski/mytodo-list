import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Output() eventFinished = new EventEmitter();
  @Output() eventRemove = new EventEmitter();
  @Input() task: Task;
  mode: string;

  constructor(private taskService: TaskService) { }

  markTaskAsFinished() {
    this.eventFinished.emit(this.task.id);
  }

  removeTask() {
    this.eventRemove.emit(this.task.id);
  }

  editMode(): void {
    this.mode = 'edit';
  }

  edit(newTitle: string): void {
    newTitle = newTitle.trim();
    if (!newTitle) {
      alert('Title of task cannot be empty!');
      return;
    }
    console.log('New Title: ', newTitle);
    this.task.title = newTitle;
    this.taskService.editTask(this.task).subscribe(response => { 
      if (true === response['success']) {
        this.mode = 'read';
      }
    });
  }

  isReadMode(): boolean {
    return this.mode == 'read' ? true : false;
  }

  ngOnInit() {
  	this.mode = 'read';
  }

}
