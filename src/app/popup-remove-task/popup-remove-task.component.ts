import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-popup-remove-task',
  templateUrl: './popup-remove-task.component.html',
  styleUrls: ['./popup-remove-task.component.css']
})
export class PopupRemoveTaskComponent implements OnInit {
  title: string;

  constructor(private dialogRef: MatDialogRef<PopupRemoveTaskComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.title = data.title;
  }

  ngOnInit() {
  }

  remove() {
  	this.dialogRef.close('yes');
  }

  close() {
  	this.dialogRef.close();
  }

}
