import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import Utils from "src/utils/utils";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  utils = new Utils(this._snackBar);

  ngOnInit(): void {}
  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res) => {
      if (res.status === 200) {
        this.utils.openSnackBar(`Logged in`, "Close");
        this.router.navigate(["/"]);
      }
    });
  }
}
