import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite: EventEmitter<void>= new EventEmitter<void>()
  @Output() onEdit: EventEmitter<void>= new EventEmitter<void>()
  @Output() onDel: EventEmitter<void>= new EventEmitter<void>()

  @HostBinding('@card') cardState= 'out';

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter', ['$event.target']) 
  onMouseEnter(target) {
    this.cardState= 'hover';
  }
  @HostListener('mouseleave', ['$event.target']) 
  onMouseLeave(target) {
    this.cardState= 'out';
  }

  onInviteClick() {
    this.onInvite.emit();
  }
  onEditClick() {
    this.onEdit.emit();
  }
  onDelClick() {
    this.onDel.emit();
  }
}
