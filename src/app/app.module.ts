import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { LoginComponent } from './login/login.component';
//import { ControlMessagesComponent } from './register-form/control-messages.component';
//import {AngularIndexedDB} from 'angular2-indexeddb';
import { ControlMessagesComponent } from '../../src/app/register-form/control-messages.component';
import { ValidationService } from '../app/register-form/validation.service';
import { TasksComponent } from './tasks/tasks.component';
import {RouterModule,Routes} from '@angular/router';
import { appRoutes} from './routing/routing.module';
import {AuthGuard} from './auth.guard';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginComponent,
    ControlMessagesComponent,
    TasksComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ ValidationService ,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
