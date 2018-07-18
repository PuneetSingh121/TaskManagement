import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {ValidationService} from '../register-form/validation.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent{

  taskForm:any;
  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      'TaskName': ['', Validators.required],
      'StartingDate': ['', Validators.required],
      'EndingDate': ['', Validators.required],
      'TaskDescription': ['', Validators.required],
      'employeeCode': ['', Validators.required],
    });
   }

   taskData = {
    name: '',
    StartingDate: '',
    EndingDate:'',
    description:'',
    employeeCode:''
  };

   saveTasks(){
    if (this.taskForm.dirty && this.taskForm.valid) {
      this.taskData.name = this.taskForm.value.TaskName;
      this.taskData.StartingDate = this.taskForm.value.StartingDate;
      this.taskData.EndingDate = this.taskForm.value.EndingDate;
      this.taskData.description= this.taskForm.value.TaskDescription;
      this.taskData.employeeCode= this.taskForm.value.employeeCode; 
      
      console.log(this.taskData);
   }

  
    const DB_NAME = 'TaskManagement';
    const DB_VERSION = 2; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'CreatedTasks';

        var database;
        var taskData1 = this.taskData;

        
          console.log("openDb ...");
          var req = indexedDB.open(DB_NAME, DB_VERSION);
          console.log(req);
          
          req.onsuccess = function (evt) {
            database = this.result;
            console.log(database);
            console.log('not success');
            console.log("openDb DONE");
            addPublication(taskData1.name ,taskData1.StartingDate,taskData1.EndingDate,taskData1.employeeCode,taskData1.description);
            console.log('Registration done successfully!!!!');  
          };



          req.onerror = function (evt:any) {
            console.error("openDb:", evt.target.errorCode);
            alert(evt.target.errorCode);
          };

          console.log('onupgraded started');

          req.onupgradeneeded = function (evt:any) {
            console.log("openDb.onupgradeneeded");

            var store = evt.currentTarget.result.createObjectStore(
              DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

            store.createIndex('name', 'name', { unique: false });
            store.createIndex('startingDate', 'startingDate', { unique: false });
            store.createIndex('endingDate', 'endingDate', { unique: false });
            store.createIndex('employeeCode', 'employeeCode', { unique: false });
            store.createIndex('description', 'description', { unique: false });
          };
          

          function getObjectStore(store_name, mode) {
            var tx = database.transaction(store_name, mode);
            return tx.objectStore(store_name);
          }

          function addPublication(name, startingDate, endingDate,employeeCode,description) {
            
            var obj1 = { name:name, startingDate: startingDate, endingDate: endingDate,employeeCode:employeeCode,description:description };
            console.log(obj1);
            var store1 = getObjectStore(DB_STORE_NAME, 'readwrite');
            console.log(store1);
            var req;
            
            req = store1.add(obj1);
            

            req.onsuccess = function (evt) {
             alert("Insertion in DB successful");
              
              //showTasks();
            };

            req.onerror = function() {
              console.error("addPublication error", this.error);
              alert(this.error);
            };
          }


}
}