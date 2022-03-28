import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res) => {
      if (res.status === 200) {
        this.router.navigate(["/"]);
      }

      console.log(res);
    });
  }
}
