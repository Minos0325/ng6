import { Directive, Renderer2, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
import { take } from 'rxjs/operators';


@Directive({
  selector: '[app-droppable][dragEnterClass][dragTags]'
})
export class DropDirective {
  
  @Input() dragEnterClass: string;
  @Input() dragTags: string[]= [];
  @Output() dropped = new EventEmitter<DragData>()

  private data$: any;

  constructor(
    private rd2: Renderer2,
    private el: ElementRef,
    private service: DragDropService,
  ) { 
    this.data$ = this.service.getDragData().pipe(take(1));
  }

  @HostListener('dragenter',['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dragTags.indexOf(dragData.tag) >-1)
        this.rd2.addClass(this.el.nativeElement, this.dragEnterClass);
      });
    }
  }
  @HostListener('dragover',['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dragTags.indexOf(dragData.tag) >-1) {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd2.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd2.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }
  @HostListener('dragleave',['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dragTags.indexOf(dragData.tag) >-1)
        this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
      });
    }
  }
  @HostListener('drop',['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dragTags.indexOf(dragData.tag) >-1) {
          this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }
}
