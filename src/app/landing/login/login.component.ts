import { ProcessDialogComponent } from './../process-dialog/process-dialog.component';
import { RegisterDialogComponent } from './../register-dialog/register-dialog.component';
import { NotifierService } from 'angular-notifier';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  version = AppConfig.MP_VERSION;
  canJoin = true;
  environmentName = this.capitalize(AppConfig.ENVIRONMENT_NAME);

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
  ) {}

  capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(e => {
      if (e['reason'] === '401') {
        this.notifierService.notify('error', 'Your session has timed out');
      } else if (e['reason'] === 'cache') {
        this.notifierService.notify(
          'error',
          'Please try to refresh your browser with CTRL-F5'
        );
      }
    });
  }

  logIn() {
    this.authService.login();
  }

  createRegisterDialog() {
    this.dialogService.open(RegisterDialogComponent);
  }

  createProcessDialog() {
    this.dialogService.open(ProcessDialogComponent);
  }
}
