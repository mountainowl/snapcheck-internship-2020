import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {  of, throwError } from 'rxjs';
import { User } from '../models/user';

const user: any = { id: 999, first_name: 'John', last_name: 'smith' };


@Injectable({ providedIn: 'root' })
export class AuthService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
      if (username === "demo" && password === "demo") {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return this.ok(user);
    } else {
        return throwError("Invalid Credentials")
    }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
     ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
  }
}