import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material";
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { TaskComponent } from './task/task.component';
import { PopupRemoveTaskComponent } from './popup-remove-task/popup-remove-task.component';
import { FilterTaskPipe } from './filter-task.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PopupRemoveTaskComponent,
    FilterTaskPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
  entryComponents: [PopupRemoveTaskComponent]
})
export class AppModule { }
