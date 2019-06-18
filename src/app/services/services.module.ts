import { NgModule, ModuleWithProviders } from "@angular/core";
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';


@NgModule()
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                ProjectService,
                TaskListService,
                TaskService,
            ]
        }
    }
}