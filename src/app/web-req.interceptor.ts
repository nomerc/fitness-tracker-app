import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, Subject, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class WebRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  refreshingAccessToken!: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    req = this.addAuthHeader(req);
    //call next and handle the response
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          //unauthorized
          //refresh the access token
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              req = this.addAuthHeader(req);
              return next.handle(req);
            }),
            catchError((err: any) => {
              console.log(err);
              this.authService.logout();
              return EMPTY;
            })
          );
        }

        return throwError(error);
      })
    );
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          //this code will run when access token refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      console.log("possible error");

      return this.authService.getNewAccessToken().pipe(
        tap((token) => {
          //!!!!
          console.log("Access Token Refreshed");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(token); //!!!!
        })
      );
    }
  }

  addAuthHeader(req: HttpRequest<any>) {
    //get access token
    const token = this.authService.getAccessToken();

    //append access token to the header
    if (token) {
      return req.clone({
        setHeaders: {
          "x-access-token": token,
        },
      });
    }

    return req;
  }
}
