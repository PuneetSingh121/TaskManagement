import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  lForm:FormGroup;
  post:any;
  employeeEmail:string='';
  employeePassword:string='';

  
  constructor(private fb:FormBuilder){

    this.lForm=fb.group({
      'employeeEmail':[null,[
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")]
      ],
      'employeePassword':[null,Validators.compose([Validators.required,Validators.minLength(10)])],
    });
 
  }
}
