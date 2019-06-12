import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../domain';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient,
    @Inject('BASE_CONFIG') private config
    ) {}
    // post 增加元素
    add(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}`;
        project.id = null;
        return this.http
            .post(uri, JSON.stringify(project), {headers: this.headers})
            .pipe(
                map(res => res.json())
            )
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
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
            .pipe(
                map(res => res.json())
            )
    }
}