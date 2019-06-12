import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    // this.form = new FormGroup({
    //   // email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // })
    // formGroup是上边的简化
    this.form = this.fb.group({
      email: ["minos", [Validators.required
        // , this.validate
      ]],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {
  }
  onsubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    // 动态指定validate
    this.form.controls['email'].setValidators(this.validate);
    console.log(value, valid);

  }
  // 自定义验证器
  validate(c: FormControl): {[key: string]: any} {
    if(!c.value) {
      return null;
    }
    const pattern = /^minos+/;
    if(pattern.test(c.value)) {
      return null;
    }
    return {emailNotValid: 'The email must Start with minos'};
  }
}
