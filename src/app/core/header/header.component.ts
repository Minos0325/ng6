import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {
  @Output() toggleL: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleR: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  openSidebar1() {
    this.toggleL.emit();
  }
  openSidebar2() {
    this.toggleR.emit();
  }
}
