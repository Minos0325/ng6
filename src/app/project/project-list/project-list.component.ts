import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { Project } from 'src/app/domain';
import { ProjectService } from 'src/app/services/project.service';
import * as _ from 'lodash';
import { filter, switchMap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[]=[];
  sub: Subscription;
  @HostBinding('@routerAnim') state;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
    ) {
      
     }
  
  ngOnInit() {
    this.sub = this.service$.get('BkkDvwee-').subscribe(
      project => {
        this.projects = project;
        console.log(this.projects);
        this.cd.markForCheck();
      }
    )
  }
  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef.afterClosed()
    .pipe(
      take(1),
      filter(v=> v),
      map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})),
      switchMap(v=> this.service$.add(v))
    )
    .subscribe(project => {
      console.log(project);
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
    });
  }
  
  launchInviteDialog(project) {
    this.dialog.open(InviteComponent, 
      {
        data: {members: []}
      }
      );
    console.log(project);
  }
  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        project: project
      }
    });
    dialogRef.afterClosed()
    .pipe(
      take(1),
      filter(v=> v),
      map(val => ({...val, 
        coverImg: this.buildImgSrc(val.coverImg),
        id: project.id
      })),
      switchMap(v=> this.service$.update(v))
    )
    .subscribe(project => {
      const index = this.projects.map(p=> p.id).indexOf(project.id);
      this.projects = [
        ...this.projects.slice(0, index), project, ...this.projects.slice(index+1)
      ];
      this.cd.markForCheck();
    });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除项目',
        content: '您确认删除该项目吗？'
      }
    })
    dialogRef.afterClosed()
    .pipe(
      take(1),
      filter(v=> v),
      switchMap(_ => this.service$.del(project))
    )
    .subscribe(prj => {
      this.projects = this.projects.filter(p=> p.id !== prj.id);
      this.cd.markForCheck();
    });
  }

  private getThumbnails() {
    return _.range(0,40)
      .map(i =>`/assets/img/covers/${i}_tn.jpg`);
  }
  private buildImgSrc(img: string): string {
    return img.indexOf('_')>-1? img.split('_',1)[0]+'.jpg': img;
  }
}
