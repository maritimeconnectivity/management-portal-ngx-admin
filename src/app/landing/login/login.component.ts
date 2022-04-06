import { NotifierService } from "angular-notifier";
import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { KeycloakLoginOptions } from "keycloak-js";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  version = "0.1.0";
  canJoin = true;

  constructor(
    private authService: AuthService,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams["reason"] === "401") {
      this.notifierService.notify("error", "Your session has timed out");
    } else if (this.route.snapshot.queryParams["reason"] === "cache") {
      this.notifierService.notify(
        "error",
        "Please try to refresh your browser with CTRL-F5"
      );
    }
  }

  logIn() {
    this.authService.login();
  }
}
