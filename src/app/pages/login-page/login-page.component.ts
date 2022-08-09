import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "@abacritt/angularx-social-login";
import Utils from "src/utils/utils";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  loading = false;

  utils = new Utils(this._snackBar);

  ngOnInit(): void {}
  onLoginButtonClicked(email: string, password: string) {
    this.showSpinner();

    this.authService.login(email, password).subscribe((res) => {
      this.hideSpinner();

      if (res.status === 200) {
        this.utils.openSnackBar(`Logged in`, "Close");
        this.router.navigate(["/calendar"]);
      }
    });
  }

  onLoginWithGoogleButtonClicked(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // .then((user: SocialUser) => {
    //   this.onLoginButtonClicked(user.id, "default_pass");
    // });
  }

  showSpinner() {
    this.loading = true;
  }
  hideSpinner() {
    this.loading = false;
  }
}
