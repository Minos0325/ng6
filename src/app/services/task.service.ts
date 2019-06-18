import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task, TaskList } from '../domain';
import { map, mergeMap, count, switchMap, mapTo, reduce } from 'rxjs/operators';
import { Observable, from, concat } from 'rxjs';

@Injectable()
export class TaskService {
    private readonly domain = 'tasks';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}
    // post 增加元素
    add(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}`;
        task.id = null;
        return this.http
            .post<Task>(uri, JSON.stringify(task), {headers: this.headers});
    }
    // put 增加元素
    update(task: Task):Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc : task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds : task.participantIds,
            remark: task.remark
        };
        return this.http
            .patch<Task>(uri, JSON.stringify(toUpdate), {headers: this.headers});
    }
    // delete 删除元素
    del(task: Task):Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        return this.http.delete(uri).pipe(
            mapTo(task)
        );
    }
    // get 取得列表
    get(taskListId: string):Observable<Task[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('taskListId', taskListId);
        return this.http
        .get<Task[]>(uri, {params: params});
    }
    // project 中所有list列表任务
    getByLists(lists: TaskList[]): Observable<Task[]> {
        return from(lists)
            .pipe(
                mergeMap( list=> this.get(list.id)),
                reduce((tasks:Task[], t: Task[])=> [...tasks, ...t],[])
            );
    }
    // 完成任务
    complete(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
       
        return this.http
            .patch<Task>(uri, JSON.stringify({complete: !task.completed}), {headers: this.headers});
    }
    // 移动任务
    move(taskId: string, taskListId: string): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${taskId}`;
        return this.http
            .patch<Task>(uri, 
                JSON.stringify({taskListId: taskListId}), {headers: this.headers});
    }
    // 移动所有任务
    moveAll(srcListId: string, targetListId): Observable<Task[]> {
        return this.get(srcListId).pipe(
            mergeMap(tasks=> from(tasks)),
            mergeMap(task=> this.move(task.id, targetListId)),
            reduce((arr: Task[], x: Task)=> [...arr, x], [])
        )
    }
}