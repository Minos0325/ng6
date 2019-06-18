import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { map, mergeMap, count, switchMap, mapTo, reduce } from 'rxjs/operators';
import { Observable, from, concat } from 'rxjs';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}
    // post 增加元素
    add(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}`;
        taskList.id = null;
        return this.http
            .post<TaskList>(uri, JSON.stringify(taskList), {headers: this.headers})
    }
    // put 增加元素
    update(taskList: TaskList):Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name : taskList.name
        };
        return this.http
            .patch<TaskList>(uri, JSON.stringify(toUpdate), {headers: this.headers})
    }
    // delete 删除元素
    del(taskList: TaskList):Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http.delete(uri).pipe(
            mapTo(taskList)
        );
    }
    // get 取得列表
    get(projectId: string):Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('projectId', projectId);
        return this.http
        .get<TaskList[]>(uri, {params: params});
    }
    // 互换顺序
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
        const drop$ = this.http.patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers});
        return concat(drag$, drop$)
            .pipe(
                reduce((arrs:  TaskList[],list: TaskList) => [...arrs, list],[])
            )
    }
}