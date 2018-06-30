import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  getTasks(): void {
  	this.taskService.getList().subscribe(data => { 
  		console.log('AppComponent.data: ', data);
  	});
  }

  ngOnInit() {
  	this.getTasks();
  }
}
