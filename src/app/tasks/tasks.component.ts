import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import {ValidationService} from '../register-form/validation.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  showTasks(){
    const DB_NAME = 'TaskManagement';
    const DB_VERSION = 1; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'CreatedTasks';

    var db;
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = function (evt) {
      db = this.result;
      console.log("openDb DONE");
    }

    function getAllItems(callback){
      var transaction = db.transaction(["CreatedTasks"]);
      var objectStore = transaction.objectStore("CreatedTasks");
      var items = [];

      transaction.oncomplete = function(evt) {  
        callback(items);
    };

    var cursorRequest = objectStore.openCursor();
     
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
         var flag=0;
         getAllItems(function (items) {
          var len = items.length;
          for (var i = 0; i < len; i += 1) {
            if(items[i].employeeCode !== ''){
              
              //this.router.navigate(['/tasks']); // use routing for redirecting it to the tasks page
              flag = 1;
              break;
            }
          }
          if(flag==0)
           alert('No data in database please create tasks');
           });
          

        req.onerror = function (evt:any) {
          console.error("openDb:", evt.target.errorCode);
          alert(evt.target.errorCode);
        };
}      
      
}

