import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Output() event = new EventEmitter();
  @Input() task: Task;
  mode: string;

  constructor(private taskService: TaskService) { }

  markTaskAsFinished() {
    this.event.emit(this.task.id);
  }
  editMode(): void {
    this.mode = 'edit';
  }

  edit(newTitle): void {
    console.log('New Title: ', newTitle);
    this.task.title = newTitle;
    this.mode = "read";
  }

  isReadMode(): boolean {
    return this.mode == 'read' ? true : false;
  }

  ngOnInit() {
  	this.mode = 'read';
  }

}
