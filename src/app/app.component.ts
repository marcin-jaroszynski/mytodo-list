import { Component, Input } from '@angular/core';
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
  @Input() titleTask: string;

  constructor(private taskService: TaskService) {}

  getTasks(): void {
  	this.taskService.getList().subscribe((response) => { 
  		if (true === response['success']) {
  			for (let i = 0; i < response['tasks'].length; i++) {
		  		let newTask = new Task.Builder()
		  							  .setId(response['tasks'][i]._id)
		  							  .setTitle(response['tasks'][i].title)
		  							  .setStatus(response['tasks'][i].status)
		  							  .setDateCreated(response['tasks'][i].created_date)
		  							  .build();
		  		this.tasks.push(newTask);
		  	}
	  	}
  	});
  }

  addTask(): void {
  	if (this.titleTask) {
  		this.taskService.addTask(this.titleTask).subscribe(response => {
  			console.log('addTask.response: ', response);
  			if (true === response['success']) {
  				let newTask = new Task.Builder()
		  							  .setId(response['task']._id)
		  							  .setTitle(response['task'].title)
		  							  .setStatus(response['task'].status)
		  							  .setDateCreated(response['task'].created_date)
		  							  .build();
		  		this.tasks.push(newTask);
		  		this.titleTask = '';
  			}
  		});
  	}
  }

  ngOnInit() {
  	this.tasks = [];
  	this.getTasks();
  }
}
