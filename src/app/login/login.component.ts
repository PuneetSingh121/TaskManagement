import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {ValidationService} from '../register-form/validation.service';
import { Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any;
    
  constructor(private formBuilder: FormBuilder,private Auth:AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      'employeeEmail': ['', [Validators.required, ValidationService.emailValidator]],
      'employeePassword': ['', [Validators.required, Validators.minLength(10),ValidationService.passwordValidator]]
    });
    
}
   
  employeeData = {
    email: '',
    password:'',
  };

  
 
  loginUser(){
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.employeeData.email = this.loginForm.value.employeeEmail;
      this.employeeData.password = this.loginForm.value.employeePassword;
    }

    var employeeData1 = this.employeeData;
    var db;
    this.databaseConnection(employeeData1,db);
  }

  



  databaseConnection(employeeData1,db){
      const DB_NAME = 'TaskManagement';
      const DB_VERSION = 1; // Use a long long for this value (don't use a float)
      const DB_STORE_NAME = 'employees';

      console.log("openDb ...");
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      
      req.onsuccess = function (evt) { 
        db = this.result;
        console.log(db);
        console.log("openDb DONE"); 
        
  function getAllItems(callback,db){
          var transaction = db.transaction(["employees"]);
          var objectStore = transaction.objectStore("employees");
          var items = [];
      
          transaction.oncomplete = function(evt) {  
            callback(items);
          };
      
          var cursorRequest = objectStore.openCursor();
          console.log(cursorRequest);
          cursorRequest.onerror = function(error) {
                  console.log(error);
          };
          
          cursorRequest.onsuccess = function(evt) {                    
              var cursor = evt.target.result;
                if (cursor) {
                    items.push(cursor.value);
                    cursor.continue();
                }
            }; 
        }
        
    getAllItems(function (items) {
          var len = items.length;
          var flag=0; 
          for (var i = 0; i < len; i += 1) {
            if(employeeData1.email == items[i].email && employeeData1.password == items[i].password ){
              flag= 1;
              alert(' You are logged in!!');
              // use routing for redirecting it to the tasks page
              this.router.navigate(['/tasks']);
              break;
            }
          }
          if(flag==0)
           alert('Username or Password is incorrect!!!');
           },db);
          }
    
      req.onerror = function (evt:any) {
        console.error("openDb:", evt.target.errorCode);
        alert(evt.target.errorCode);
      };

  }


}

  
 


 