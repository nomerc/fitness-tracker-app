import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import Utils from "src/utils/utils";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  utils = new Utils(this._snackBar);

  ngOnInit(): void {}

  onSignupButtonClicked(name: string, email: string, password: string) {
    this.authService.signup(name, email, password).subscribe((res) => {
      if (res.status === 200) {
        this.utils.openSnackBar(`Logged in`, "Close");
        this.router.navigate(["/calendar"]);
      }
    });
  }
}
