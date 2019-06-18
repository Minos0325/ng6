import { Component, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  
  title = 'demo';
  darkTheme = false;
  squareState: string;

  switchTheme(dark: boolean) {
    this.darkTheme = dark;
    
    this.darkTheme? 
    this.oc.getContainerElement().classList.add('unicorn-dark-theme'):
    this.oc.getContainerElement().classList.remove('unicorn-dark-theme');
  }
  constructor(
    private oc: OverlayContainer,
    @Inject('BASE_CONFIG') private config: string
    ) {
      console.log(this.config)
  }
}