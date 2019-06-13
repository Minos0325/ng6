import { NgModule, ModuleWithProviders } from "@angular/core";
import { ProjectService } from './project.service';


@NgModule()
export class ServicesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                ProjectService,
                
            ]
        }
    }
}