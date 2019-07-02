import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items: string[];
  form: FormGroup;
  private readonly avatarName= 'avatars';
  constructor(private fb: FormBuilder) { 
   
  }

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
      dateOfBirthday: ["1991-08-19"]
    })
  }

  onChange(ev) {
    console.log(ev);
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(value, valid);
  }
 
}
