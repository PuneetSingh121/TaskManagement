import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form,[email][formControlName],[email][formControl],[email][ngModel]',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})

export class RegisterFormComponent{

  rForm:FormGroup;
  post:any;
  employeeCode:string='';
  employeeEmail:string='';
  employeePassword:string='';

  
  constructor(private fb:FormBuilder){

    this.rForm=fb.group({
      'employeeCode':[null,Validators.required],
      'employeeEmail':[null,[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      ],
      'employeePassword':[null,Validators.compose([Validators.required,Validators.minLength(10)])],
    });
  }


  
  register1='';
  register(){
      this.register1="You have registered successfully";
      console.log(this.register1); 
  }  

  
}
