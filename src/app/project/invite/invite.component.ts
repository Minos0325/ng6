import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  items = [
    {
      id:1,
      name: 'minos'
    },
    {
      id:2,
      name: 'papillon'
    },
    {
      id:3,
      name: 'kaos'
    },
  ]
  constructor(private dialogRef: MatDialogRef<InviteComponent>) { }

  ngOnInit() {
  }
  onClick() {
    this.dialogRef.close();
  }
  displayUser(user: {id: string; name: string}): string {
    return user? user.name : '';
  }
}
