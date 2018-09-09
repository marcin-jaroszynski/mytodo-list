import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-popup-add-task',
  templateUrl: './popup-add-task.component.html',
  styleUrls: ['./popup-add-task.component.css']
})
export class PopupAddTaskComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PopupAddTaskComponent>) { }

  ngOnInit() {
  }

  close() {
  	this.dialogRef.close();
  }

}
