import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { LoginComponent } from './login/login.component';
//import { ControlMessagesComponent } from './register-form/control-messages.component';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { ControlMessagesComponent } from '../../src/app/register-form/control-messages.component';
import { ValidationService } from '../app/register-form/validation.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ ValidationService ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
