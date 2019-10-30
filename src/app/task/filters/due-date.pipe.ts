import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../task';
@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {
  transform(items: Task[], dueDate): Task[] {
    if (!items) {
    	return [];
    }
    if (!dueDate) {
    	return items;
    }
    return items.filter(task => task.date_due.toISOString() === dueDate.toISOString());
  }

}
