import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][draggedClass][dragTag][dragData]'
})
export class DragDirective {
  private _isDraggable = false;
  // 表示这个set方法 对应出去是 app-draggable 这个属性
  @Input('app-draggable')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd2.setAttribute(this.el.nativeElement, 'draggable',`${val}`);
  } 
  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(
    private rd2: Renderer2,
    private el: ElementRef,
    private service: DragDropService,
    ) { }




  @HostListener('dragstart', ['$event']) 
  onDragStart(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd2.addClass(this.el.nativeElement, this.draggedClass)
      this.service.setDragData({tag: this.dragTag, data: this.dragData})
    }
  }

  @HostListener('dragend', ['$event']) 
  onDragEnd(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd2.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }
}
