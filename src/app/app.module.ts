import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
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
import { PopupModifyTaskComponent } from './popup-modify-task/popup-modify-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    PopupRemoveTaskComponent,
    FilterTaskPipe,
    LoginComponent,
    DashboardComponent,
    PopupModifyTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    TaskService, 
    LoginService, 
    CookieService, 
    MessageService, 
    AuthService,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupRemoveTaskComponent, PopupModifyTaskComponent]
})
export class AppModule { }
