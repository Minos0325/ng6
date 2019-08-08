import { Component, OnInit, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Address } from 'src/app/domain';
import { Subject, Observable, combineLatest, Subscription, of } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=> AreaListComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(()=> AreaListComponent), multi: true},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private propagateChange= (_: any)=> {};
  _address: Address= {
    province: '',
    city: '',
    district: '',
    street: '',
  };
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  provinces$: Observable<string>;
  cities$: Observable<string>;
  districts$: Observable<string>;

  sub: Subscription;

  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$], (_p, _c, _d, _s)=> {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });
    this.sub = val$.subscribe(v => this.propagateChange(v))

    this.provinces$ = of(getProvince());
    this.cities$ = province$.map(p => getCitiesByProvince(p));
    this.district$ = combineLatest( province$, city$, (p, c)=> {
      getAreaByCity(p, c);
    })
  }
  writeValue(obj: Address) {
    if(obj) {
      this._address = obj;
    }
  }
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) {}
  onIdTypeChange(val) {
    console.log(val);
  }
  onIdNoChange(val) {
    console.log(val);
  }

  validate(c: FormControl):{[key: string]: any} {
    const val = c.value;
    if(!val) return null;
    if(val.province && val.city && val.district && val.street) {
      return null;
    }
    return {addressInvalid: true}
  }
  // change 事件
  onProvinceChange() {
    this._province.next(this._address.province);
  }
  onCityChange() {
    this._city.next(this._address.city);
  }
  onDistrictChange() {
    this._district.next(this._address.district);
  }
  onStreetChange() {
    this._street.next(this._address.street);
  }

  // // 数据
  // getProvince() {}
  // getCitiesByProvince(p) {}
  // getAreaByCity(c) {}

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
}
