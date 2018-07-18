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
  }

  
      employeeData = {
        code: '',
        email: '',
        password:'',
      };
          
      saveUser() {
       if (this.userForm.dirty && this.userForm.valid) {
          this.employeeData.code = this.userForm.value.employeeCode;
          this.employeeData.email = this.userForm.value.employeeEmail;
          this.employeeData.password = this.userForm.value.employeePassword; 
          
          console.log(this.employeeData);
      }

      //var employees=[
       // { code:this.employeeData.code ,
         // email:this.employeeData.email,
          //password:this.employeeData.password}
      //];

        
        if(window.indexedDB){
          console.log('IndexedDB is supported');
          }
          
      
        const DB_NAME = 'TaskManagement';
        var DB_VERSION = 1; // Use a long long for this value (don't use a float)
        const DB_STORE_NAME = 'employees';

        var db;

        var employeeData1 = this.employeeData;

        
          console.log("openDb ...");

          var req = indexedDB.open(DB_NAME, DB_VERSION);
          console.log(req);
          
          req.onsuccess = function (evt) {
            db = this.result;
            console.log(db);
            console.log("openDb DONE");
            console.log(this);
            addPublication(employeeData1.code ,employeeData1.email,employeeData1.password);
            alert('Registration done successfully!!!!');  
          };



          req.onerror = function (evt:any) {
            console.error("openDb:", evt.target.errorCode);
            alert(evt.target.errorCode);
          };
          
          req.onupgradeneeded = function (evt:any) {
            console.log("openDb.onupgradeneeded");
            console.log("Old Version: " + evt.oldVersion);
            console.log("New Version: " + evt.newVersion);

            var store = evt.currentTarget.result.createObjectStore(
              DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

            store.createIndex('code', 'code', { unique: true });
            store.createIndex('email', 'email', { unique: false });
            store.createIndex('password', 'password', { unique: false });
          };
          

        function getObjectStore(store_name, mode) {
          var tx = db.transaction(store_name, mode);
          return tx.objectStore(store_name);
        }
        

        
  
        function addPublication(code, email, password) {
          var obj = { code:code, email: email, password: password };
         
          var store = getObjectStore(DB_STORE_NAME, 'readwrite');
          var req;
          
          req = store.add(obj);
          
          req.onsuccess = function (evt) {
            console.log("Insertion in DB successful");
            db.close();
          };

          req.onerror = function() {
            console.error("addPublication error", this.error);
            alert(this.error);
          };
        }
      
        

  
}
}