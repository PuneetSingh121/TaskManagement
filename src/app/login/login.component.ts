import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {ValidationService} from '../register-form/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  loginForm: any;
  
  constructor(private formBuilder: FormBuilder) {
      
    this.loginForm = this.formBuilder.group({
      'employeeEmail': ['', [Validators.required, ValidationService.emailValidator]],
      'employeePassword': ['', [Validators.required, Validators.minLength(10),ValidationService.passwordValidator]]
    });

    console.log(this.loginForm);
  }

  loginUser() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      alert(`Email: ${this.loginForm.value.employeeEmail} Password: ${this.loginForm.value.employeePassword}`);
    }
  }
}
