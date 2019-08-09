import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { extractInfo, isValidAddr, getAddrByCode } from 'src/app/utils/identity.util';
import { IdentityType } from 'src/app/domain';
import { isValidDate } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  items: string[];
  form: FormGroup;
  private readonly avatarName= 'avatars';
  constructor(private fb: FormBuilder) { 
   
  }
  sub: Subscription;
  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`;
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(v=>`avatars:svg-${v}`);
    this.form= this.fb.group({
      email: [""],
      name: [""],
      password: [""],
      repeat: [""],
      // avatar: [img]
      avatar: [''],
      dateOfBirthday: ["1991-08-19"],
      identity: [],
      address: ['']
    });
    const id$ = this.form.get('identity').valueChanges.pipe(
      debounceTime(300),
      filter(_ => this.form.get('identity').valid),
    );
    this.sub = id$.subscribe(id=> {
      const info = extractInfo(id.identityNo);
      if(isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if(isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirthday').patchValue(info.dateOfBirth);
      }
    })
  }

  onChange(ev) {
    console.log(ev);
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(value, valid);
  }
  
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
}
