import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/domain';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  
  members: User[] = [];
  constructor(
    private dialogRef: MatDialogRef<InviteComponent>,
    @Inject(MAT_DIALOG_DATA) private data
    ) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }
  onSubmit(ev: Event, {valid, value}) {
    ev.preventDefault();
    if(!valid) return;
    this.dialogRef.close(this.members);
  }
}
