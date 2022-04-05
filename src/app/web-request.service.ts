import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebRequestService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.SERVER_URI;
  }
  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users/login`,
      { email, password },
      { observe: "response" }
    );
  }
  signup(userName: string, email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users`,
      { userName, email, password },
      { observe: "response" }
    );
  }
}
