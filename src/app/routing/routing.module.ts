import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import {TaskCreateComponent} from '../task-create/task-create.component';
import {ModuleWithProviders} from '@angular/core';
import { AuthGuard } from '../auth.guard';
//you need to export the route to known to app module

export const appRoutes: Routes = [
  {path: '', component: RegisterFormComponent},
  {path: 'taskCreate', component: TaskCreateComponent},
  {path: 'tasks', component: TasksComponent,
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);