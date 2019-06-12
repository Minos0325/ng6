import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() taskClick: EventEmitter<void> = new EventEmitter<void>();

  widerPriority = 'out'

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner?
      this.item.owner.avatar :
      "unassigned";
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority= 'in';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority= 'out';
  }

  onItemClick() {
    this.taskClick.emit();
  }
  onCheckBoxClick(ev: Event) {
    // ev.preventDefault();
    ev.stopPropagation();
  }
}
