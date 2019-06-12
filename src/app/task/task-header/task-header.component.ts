import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  
  @Input() header: string = '';
  @Output() newTask: EventEmitter<void>= new EventEmitter<void>()
  @Output() moveAll: EventEmitter<void>= new EventEmitter<void>()
  @Output() delList: EventEmitter<void>= new EventEmitter<void>()
  @Output() editList: EventEmitter<void>= new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }
  onNewTaskClick() {
    this.newTask.emit();
  }
  onMoveAllClick() {
    this.moveAll.emit();
  }
  onDelListClick() {
    this.delList.emit();
  }
  onEditListClick() {
    this.editList.emit();
  }
  
}
