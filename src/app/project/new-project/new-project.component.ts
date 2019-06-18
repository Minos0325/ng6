import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title: string='';
  form: FormGroup;
  coverImages = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // console.log(JSON.stringify(this.data));
    this.coverImages = this.data.thumbnails;
    if(this.data.project) {
      this.title = "修改项目";
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
    } else {   
      this.title = "创建项目";
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
    }
  }
  onSubmit({valid, value}, ev: Event) {
    ev.preventDefault();
    if(!valid) return;
    this.dialogRef.close(value);

  }
}
