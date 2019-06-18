import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';
import { TaskList } from 'src/app/domain';
import { TaskListService } from 'src/app/services/task-list.service';


@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  lists: TaskList[] = [];
  @Input() projectId = 'Hya1moGb-';
  constructor(
    private dialog: MatDialog,
    private tasklistService: TaskListService,
    private cd: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.tasklistService.get(this.projectId).subscribe( _=> {
      this.lists = _;
      this.cd.markForCheck();
    })
  }
  @HostBinding('@routerAnim') state;
  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '新建项目'}});
  }
  launchCopyAllDialog(list) {
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: {lists: this.lists}
    })
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        task: task
      }
    })
  }
  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除任务列表',
        content: '您确认删除该任务列表吗？'
      }
    })
    dialogRef.afterClosed().subscribe(v=> console.log(v));
  }
  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '修改列表名称'
      }
    })
    dialogRef.afterClosed().subscribe(v=> console.log(v));
  }
  newListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新建列表'
      }
    })
    dialogRef.afterClosed().subscribe(v=> console.log(v));
  }
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        const srcList = srcData.data;
        const tempOrder = srcData.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;    
      default:
        break;
    }
  }
  handleQuickTask(desc: string) {
    console.log(desc);
  }
}
