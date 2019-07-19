import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quoteService';
import { Quote } from 'src/app/domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    "id": "0",
    "cn": "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    "en": "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    "pic": "/assets/img/quotes/0.jpg"
  };
  constructor(
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private http: HttpClient
  ) {
   this.quoteService$
   .getQuote()
   .subscribe(q=> this.quote = q)
  }

  ngOnInit() {
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

  demoHTTP() {
    console.log(123)
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
    this.http.post('http://172.16.0.109:8088/sm/enterprise/user/testFindCa',
     JSON.stringify({username: 1}),
     {headers: headers}
    )
  }
}
