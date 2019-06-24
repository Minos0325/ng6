import { NgModule, ModuleWithProviders } from "@angular/core";
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';


@NgModule()
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                ProjectService,
                TaskListService,
                TaskService,
                UserService,
                AuthService,

                AuthGuardService,
            ]
        }
    }
}