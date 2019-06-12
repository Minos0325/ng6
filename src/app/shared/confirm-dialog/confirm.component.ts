import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <form>
    <h1 mat-dialog-title>{{title}}</h1>
    
    <div mat-dialog-content>
        {{content}}
    </div>
    <div mat-dialog-actions>
        <button type="button" (click)='onClick(true)' mat-raised-button color='primary'>确定</button>
        <button type="button" (click)='onClick(false)' mat-button mat-dialog-close>取消</button>
    </div>
  </form>
  `,
  styles: [

  ]
})
export class ConfirmDialogComponent implements OnInit {
  title: string= '';
  content: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;

  }
  onClick(result: boolean) {
    this.dialogRef.close(result);
  }
}
