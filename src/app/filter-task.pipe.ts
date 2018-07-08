import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(items: Task[], typeTask: string): Task[] {
    if (!items) {
    	return [];
    }
    if (!typeTask || typeTask === 'all') {
    	return items;
    }
    return items.filter(task => {
    	return (task.status === typeTask);
    });
  }

}
