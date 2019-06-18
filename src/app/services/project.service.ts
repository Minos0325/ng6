import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}
    // post 增加元素
    add(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}`;
        project.id = null;
        return this.http
            .post<Project>(uri, JSON.stringify(project), {headers: this.headers})
    }
    // put 增加元素
    update(project: Project):Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name : project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
            .patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers})
    }
    // delete 删除元素
    del(project: Project):Observable<Project> {
        const delTasks$= from(project.taskLists?project.taskLists: [] )
            .pipe(
                mergeMap( 
                    listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`)
                ),
                count()
            );
        
        return delTasks$.pipe(
            switchMap(
                _=> this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)
            ),
            mapTo(project)
        );
    }
    // get 取得列表
    get(userId: string):Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        const params = new HttpParams().set('members_like', userId);
        return this.http
        .get<Project[]>(uri, {params: params});
    }
}