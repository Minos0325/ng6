import { Component, OnInit, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Address } from 'src/app/domain';
import { Subject, Observable, combineLatest, Subscription, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { getAreasByCity, getProvinces, getCitiesByProvince } from 'src/app/utils/area.util';

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

  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  _sub: Subscription;

  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$]).pipe(
      map(([_p, _c, _d, _s]) => ({
        province: _p,
        city: _c,
        district: _d,
        street: _s
      }))
    );
    this._sub = val$.subscribe(v => {
      this.propagateChange(v);
    });
    this.provinces$ = of(getProvinces());
    this.cities$ = province$.pipe(map(p => getCitiesByProvince(p)));
    this.districts$ = combineLatest(province$, city$).pipe(
      map(([p, c]) => getAreasByCity(p, c))
    )
  }
  writeValue(obj: Address) {
    if(obj) {
      this._address = obj;
      if(this._address.province) {
        this._province.next(this._address.province);
      }
      if(this._address.city) {
        this._city.next(this._address.city);
      }
      if(this._address.district) {
        this._district.next(this._address.district);
      }
      if(this._address.street) {
        this._street.next(this._address.street);
      }
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
    console.log('onProvinceChange')
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
    if(this._sub) this._sub.unsubscribe();
  }
}
