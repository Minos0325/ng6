import { Component, OnInit, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { IdentityType, Identity } from 'src/app/domain';
import { Subscription, Subject, combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=> IdentityInputComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(()=> IdentityInputComponent), multi: true},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private propagateChange= (_: any)=> {};
  identityTypes  = [
    {label: '身份证', value: IdentityType.IdCard},
    {label: '医保', value: IdentityType.Insurance},
    {label: '护照', value: IdentityType.Passport},
    {label: '军官证', value: IdentityType.Military},
    {label: '其他', value: IdentityType.Other},
  ];
  identity: Identity = { identityNo: null, identityType: null };
  private _idType= new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  sub: Subscription;

  constructor() { }

  ngOnInit() {
    const val$ = combineLatest(this.idType, this.idNo, (_no, _type)=> {
      return {
        identityType: _type,
        identityNo: _no
      }
    });
    this.sub = val$.subscribe(id=> {
      this.propagateChange(id);
    })
  }
  writeValue(obj: any) {
    if(obj) {
      this.identity = obj;
    }
  }
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) {}

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }
  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }
  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }
  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  validate(c: FormControl):{[key: string]: any} {
    const val = c.value;
    if(!val) return null;
    switch(val.identityType) {
      case IdentityType.IdCard: 
        return this.validateIdCard(c);
        break;
      case IdentityType.Passport: 
        return this.validatePassport(c);
        break;
      case IdentityType.Military: 
        return this.validateIdMilitary(c);
        break;
      // case IdentityType.Other: 
      //   return this.validateOther();
      //   break;
      // case IdentityType.Insurance: 
      //   return this.validateInsurance();
      //   break;
      default:
        return null 
        break;
    }
  }
  validateIdCard(c: FormControl):{[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 18) return {idInvalid: 'true'};
    const pattern =  /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idNotInvalid: true};
  }
  validatePassport(c: FormControl):{[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 9) return {passportInvalid: 'true'};
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {passportNotInvalid: true};
  }
  validateIdMilitary(c: FormControl):{[key: string]: any} {
    const val = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : {militaryNotInvalid: true};
  }
  ngOnDestroy(): void {
    if(this.sub)this.sub.unsubscribe();
  }
}
