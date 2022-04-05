import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version = "0.1.0";
  canJoin = true;

  constructor() { }

  ngOnInit(): void {
  }

  logIn() {

  }

}
