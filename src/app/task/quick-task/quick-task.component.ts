import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  desc: string;
  constructor() { }
  @Output() quickTask = new EventEmitter();

  ngOnInit() {
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(value);
    console.log(valid);
  }
  @HostListener('keyup.enter', ['$event'])
  sendQuickTask() {
    if(!this.desc || !this.desc.trim() || this.desc.length==0) return;
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
