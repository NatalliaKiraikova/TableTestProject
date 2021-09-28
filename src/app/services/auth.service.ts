import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { delay } from 'rxjs/operators';

export const ROLES = {
  admin: 'admin',
  user: 'user',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User = new User();

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(this.user);
  private userKey = 'user'

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialogRef: MatDialog
  ) {
    try {
      if (!this.user.token) {
        this.user = JSON.parse(localStorage.getItem(this.userKey) || '');
        this.userSubject.next(this.user);
      }
    } catch (e) {
      console.warn('User not found in storage.');
    }
  }

  isAdmin(): boolean {
    return !!(this.user && this.user.role === ROLES.admin);
  }

  getUser(): User {
    return this.user;
  }

  userObservable(): Observable<User> {
    return this.userSubject.asObservable();
  }

  signIn(username: string, password: string): Observable<{ [key: string]: any }> {
    const params = {
      username: username ? username.trim() : null,
      password: password ? password.trim() : null
    };
    /*
       return this.apiService.post('/authenticate', params)
         .pipe(
           switchMap(
             (user: RemoteUser) => {
               this.user = User.deserialize(user);
               if (this.user && this.user.token) {
                 localStorage.setItem(this.userKey, JSON.stringify(this.user));
               }
               this.userSubject.next(this.user);
             }
           )
         );*/
    // mock data
    const user = {
      token: 'sdfsadfsdafll312:33123:Fsafdsfasd',
      role: ROLES.admin,
      regComplete: true,
      userId: '32',
    }
    this.user = user;

    this.apiService.post('/authenticate', params);
    return of(user).pipe(
      delay(1000)
    );
  }

  logout(): void {
    this.clearCache();
    this.dialogRef.closeAll();
    this.router.navigate(['/login'], {replaceUrl: true});
  }

  clearCache(): void {
    this.user = {} as User;
    localStorage.removeItem(this.userKey);
  }
}
