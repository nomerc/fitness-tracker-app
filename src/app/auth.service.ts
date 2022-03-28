import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { shareReplay, tap } from "rxjs/operators";
import { WebRequestService } from "./web-request.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private webService: WebRequestService
  ) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //auth token will be in the header
        this.setSession(
          res.body._id,
          String(res.headers.get("x-access-token")),
          String(res.headers.get("x-refresh-token"))
        );
        console.log("Logged in");
      })
    );
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //auth token will be in the header
        this.setSession(
          res.body._id,
          String(res.headers.get("x-access-token")),
          String(res.headers.get("x-refresh-token"))
        );
        console.log("Signed up and logged in");
      })
    );
  }

  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  logout() {
    this.removeSession();
    this.router.navigate(["/login"]);
  }

  private removeSession() {
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  getRefreshToken() {
    return localStorage.getItem("x-refresh-token");
  }

  getAccessToken() {
    return localStorage.getItem("x-access-token");
  }

  getUserId() {
    return localStorage.getItem("user-id");
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem("x-access-token", accessToken);
  }

  getNewAccessToken() {
    return this.http
      .get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          "x-refresh-token": String(this.getRefreshToken()),
          _id: String(this.getUserId()),
        },
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(String(res.headers.get("x-access-token")));
        })
      );
  }
}
