import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-r',
  templateUrl: './sidebar-r.component.html',
  styleUrls: ['./sidebar-r.component.scss']
})
export class SidebarRComponent implements OnInit {
  @Output() toggleDarkTheme: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }
  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
}
