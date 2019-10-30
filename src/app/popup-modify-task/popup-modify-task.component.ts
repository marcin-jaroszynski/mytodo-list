import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-popup-modify-task',
  templateUrl: './popup-modify-task.component.html',
  styleUrls: ['./popup-modify-task.component.css']
})
export class PopupModifyTaskComponent implements OnInit {
  myform: FormGroup;
  task: Task;
  isEditMode: Boolean;
  popupTitle: String;
  onAddTask = new EventEmitter();
  onEditTask = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<PopupModifyTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private taskService: TaskService) {
    this.popupTitle = "Add task";
    this.isEditMode = false;
    if (data) {
      this.task = new Task(data.task);
      this.isEditMode = true;
      this.popupTitle = "Edit task";
    }
  }


  ngOnInit() {
    this.myform = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(),
      dueDate: new FormControl()
    });

    if (this.isEditMode) {
      this.myform.controls.title.setValue(this.task.title);
      this.myform.controls.content.setValue(this.task.content);
      this.myform.controls.dueDate.setValue(this.task.date_due);
    }
  }

  add() {
    this.taskService.addTask(this._getTaskToAdd()).subscribe(response => {
      if (true === response['success']) {
        const createdTask = new Task.Builder()
               .setId(response['task']._id)
               .setTitle(response['task'].title)
               .setContent(response['task'].content)
               .setDateDue(response['task'].due_date)
               .setStatus(response['task'].status)
               .setDateCreated(response['task'].created_date)
               .build();
        this.onAddTask.emit(createdTask);
        this.close();
      }
    });
  }

  edit() {
    this.task.title = this.myform.controls.title.value;
    this.task.content = this.myform.controls.content.value;
    this.task.date_due = this._getDueDate();
    this.taskService.editTask(this.task).subscribe(response => {
      if (true === response['success']) {
        this.onEditTask.emit(this.task);
      }
      this.close();
    });
  }

  close() {
  	this.dialogRef.close();
  }

  getInvalidTitleMessage() {
  	return !this._isTitleValid() ? 'This field is required' : '';
  }

  isFormValid() {
  	return this._isTitleValid();
  }

  _getDueDate() {
    const dueDate = this.myform.controls.dueDate.value;
    if (dueDate) {
      return dueDate;
    }
    return undefined;
  }

  _isTitleValid() {
    return !this.myform.controls.title.invalid;
  }

  _getTaskToAdd() {
    return new Task.Builder().setTitle(this.myform.controls.title.value)
               .setContent(this.myform.controls.content.value)
               .setDateDue(this._getDueDate())
               .build();
  }
}
