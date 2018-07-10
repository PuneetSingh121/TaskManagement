import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {ValidationService} from './validation.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})

export class RegisterFormComponent{

  userForm: any;
  
  constructor(private formBuilder: FormBuilder) {
      
    this.userForm = this.formBuilder.group({
      'employeeCode': ['', Validators.required],
      'employeeEmail': ['', [Validators.required, ValidationService.emailValidator]],
      'employeePassword': ['', [Validators.required, Validators.minLength(10),ValidationService.passwordValidator]]
    });

    console.log(this.userForm);
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Code: ${this.userForm.value.employeeCode} Email: ${this.userForm.value.employeeEmail} Password: ${this.userForm.value.employeePassword}`);
    }
  }
  
}
