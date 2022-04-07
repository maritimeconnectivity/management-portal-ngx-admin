import { NotifierService } from 'angular-notifier';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version = '0.1.0';
  canJoin = true;

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

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
}
