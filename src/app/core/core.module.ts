import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarRComponent } from './sidebar-r/sidebar-r.component';
// svg
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { loadSvgResources } from '../utils/svg.utils';

import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';

import { AppRoutingModule } from '../app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

// import '../utils/debug.utils';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarRComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarRComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    // SharedModule,
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue:{uri: 'http://localhost:3000'}},
    
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry, ds: DomSanitizer
  ) {
    if(parent) {
      throw new Error('CoreModule has worked, can not reload; error in core/core.module.ts')
    }
    loadSvgResources(ir, ds);
  }
}
