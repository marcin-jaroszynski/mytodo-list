import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { TaskComponent } from './task/task.component';
import { PopupRemoveTaskComponent } from './popup-remove-task/popup-remove-task.component';
import { FilterTaskPipe } from './filter-task.pipe';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { PopupAddTaskComponent } from './popup-add-task/popup-add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PopupRemoveTaskComponent,
    FilterTaskPipe,
    LoginComponent,
    DashboardComponent,
    PopupAddTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [TaskService, LoginService, CookieService, MessageService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [PopupRemoveTaskComponent, PopupAddTaskComponent]
})
export class AppModule { }
