import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskHomeComponent } from './task-home/task-home.component';
const route: Routes = [
    {path: 'task-home', component: TaskHomeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule],

})
export class TaskRoutingModule { }