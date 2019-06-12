import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DragData {
  tag: string;
  data: any;
}
@Injectable()
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);
  setDragData(data: DragData) {
    this._dragData.next(data);
  }
  getDragData() {
    return this._dragData.asObservable();
  }
  clearDragData() {
    this._dragData.next(null);
  }
}
