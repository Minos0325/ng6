import { Component, Input, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { 
  ControlValueAccessor,
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { User } from 'src/app/domain';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(()=>ChipsListComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(()=>ChipsListComponent), multi: true}
  ]
})
export class ChipsListComponent implements OnInit, OnDestroy,ControlValueAccessor {
  private propagateChange: (_: any)=> void = (_: any)=> {};
  @Input() multiple = true;
  @Input() placeholderText = '请输入成员 email';
  @Input() label = '添加/修改成员'
  form: FormGroup;
  items: User[]= [];
  memberResults$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service :UserService) { }
  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(s => s && s.length >1),
        map(v => {
          console.log(v)
          return v;
        }),
        switchMap(str => this.service.searchUsers(str)),
        
      )

  }
  writeValue(obj: User[]): void {
    if(obj && this.multiple) {
      const userEntities = obj.reduce((e, c)=> ({...e, c}), {})
      if(this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else  if(obj && !this.multiple){
      this.items = [...obj];
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  validate(c: FormControl):{[key: string]: any} {
    return this.items ? null : {
      chipListInvlid: 'true'
    };
  }
  
  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if(this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }
  handleMemberSelection(member: User) {
    if(this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }
    this.items = this.multiple ? [...this.items, member]: [member];
    this.form.patchValue({memberSearch: member.name})
    this.propagateChange(this.items);
  }
  displayUser(user: User): string {
    return user? user.name : '';
  }
  get displayInput() {
    return this.multiple || this.items.length !== 0;
  }
  ngOnDestroy(): void {
    
  }
}
