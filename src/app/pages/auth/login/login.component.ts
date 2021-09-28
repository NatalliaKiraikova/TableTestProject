import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { LOGIN_LABELS } from './login.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public labels: any = LOGIN_LABELS;
  public loginForm: FormGroup;
  public inUse: boolean;
  public registrationLink: string;
  private destroyer: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private dialogRef: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]*.')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dialogRef.closeAll();
  }

  onLogin(): void {
    const {username, password} = this.loginForm.value;
    this.inUse = true;
    this.authService.clearCache();
    this.authService.signIn(username, password)
      .pipe(
        finalize(() => this.inUse = false),
        takeUntil(this.destroyer)
      )
      .subscribe(
        (user: User) => {
          this.routeAfterLogin(user);
        },
        err => {
          if (err) {
            this.notification.error(err.message);
          }
        }
      );
  }

  clear(): void {
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    this.destroyer.next();
    this.destroyer.complete();
  }

  private routeAfterLogin(user: User): void {
    if (user.role) {
      this.router.navigate(['/dashboard']);
    } else {
      this.notification.error(LOGIN_LABELS.forbiddenMessage);
    }
  }
}
