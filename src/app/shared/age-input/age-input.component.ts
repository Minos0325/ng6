import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> AgeInputComponent),
    multi: true
  }]
})
export class AgeInputComponent implements ControlValueAccessor{
  
  private obj;
  private fn: (_: any)=> {};
  constructor() { }
  writeValue(obj: any): void {
    this.obj = obj;
  }
  registerOnChange(fn: any): void {
    this.fn = fn;
  }
  registerOnTouched(fn: any): void { }
}
