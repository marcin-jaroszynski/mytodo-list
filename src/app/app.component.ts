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
  @Input() typeTask: string;
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
		  							  .setDateFinished(response['tasks'][i].finished_date)
		  							  .build();
		  		this.tasks.push(newTask);
		  	}
	  	}
  	});
  }

  addTask(): void {
  	if (!this.titleTask.trim()) {
      alert('Title of task cannot be empty!');
      this.titleTask = '';
      return;
    }
		this.taskService.addTask(this.titleTask.trim()).subscribe(response => {
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

  markTaskAsFinished(id: string): void {
    this.taskService.markAsFinished(id).subscribe(response => {
      if (true === response['success']) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (id == this.tasks[i].id) {
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
          if (id == this.tasks[i].id) {
            this.tasks.splice(i, 1);
            break;
          }
        }
      }
    });
  }

  ngOnInit() {
  	this.tasks = [];
    this.typeTask = 'all';
  	this.getTasks();
  }
}
