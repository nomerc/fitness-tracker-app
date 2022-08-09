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
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  utils = new Utils(this._snackBar);
  loading = false;

  ngOnInit(): void {}

  onSignupButtonClicked(name: string, email: string, password: string) {
    this.showSpinner();
    this.authService.signup(name, email, password).subscribe((res) => {
      this.hideSpinner();
      if (res.status === 200) {
        this.utils.openSnackBar(`Logged in`, "Close");
        this.router.navigate(["/calendar"]);
      }
    });
  }

  onSignupWithGoogleButtonClicked(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // .then((user: SocialUser) => {
    //   this.onSignupButtonClicked(user.name, user.id, "default_pass");
    // });
  }
  showSpinner() {
    this.loading = true;
  }
  hideSpinner() {
    this.loading = false;
  }
}
