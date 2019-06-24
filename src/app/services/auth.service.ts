import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Auth, User } from '../domain';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private readonly domain = 'users';
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    
    private token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
        '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}
    // 注册
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {"emial": user.email}})
            .pipe(
                switchMap(res => {
                    if((<User[]>res).length >0) {
                        throw 'user existed';
                    }
                    return this.http
                        .post(uri, JSON.stringify(user), {headers: this.headers})
                        .pipe(
                            map(r => ({token: this.token, user: <User>r}))
                        )
                })
            )
            
    }
    // 登录
    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email': username, 'password': password}})
            .pipe(
                map(res => {
                    if((<User[]>res).length === 0) {
                        throw 'username or password not match';
                    }
                    return {
                        token: this.token,
                        user: res[0]
                    }
                })
            )
    }
}