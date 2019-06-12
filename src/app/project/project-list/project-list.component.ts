import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects: any[]=[
    {id:1, name: '1', desc:'1', coverImg: 'assets/img/covers/0.jpg'},
    {id:2, name: '2', desc:'2', coverImg: 'assets/img/covers/1.jpg'},
    // {name: '3', desc:'3', coverImg: 'assets/img/covers/2.jpg'},
    // {name: '4', desc:'4', coverImg: 'assets/img/covers/3.jpg'}
  ];
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
    
    ) { }
  
  ngOnInit() {
  }
  @HostBinding('@routerAnim') state;
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
          title: '新增项目',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      this.projects= [...this.projects, {id: 3, name: '1新项目', desc: '新项目', coverImg: 'assets/img/covers/0.jpg'}]
      this.projects= [...this.projects, {id: 4, name: '2新项目', desc: '新项目', coverImg: 'assets/img/covers/0.jpg'}]
      
      this.cd.markForCheck();
    });
  }
  
  launchInviteDialog(project) {
    this.dialog.open(InviteComponent);
    console.log(project);
  }
  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: '编辑项目',
      }
    })
  }
  launchConfirmDialog(project) {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '您确认删除该项目吗？'
      }
    })
    dialogRef.afterClosed().subscribe(v=> {
      this.projects = this.projects.filter(v => v.id !== project.id)
      this.cd.markForCheck();
    });
  }
}
