import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { WebRequestInterceptor } from "./web-req.interceptor";

//login
import {
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";

//Layout
import { FlexLayoutModule } from "@angular/flex-layout";

//charts
import { NgApexchartsModule } from "ng-apexcharts";

//angular material
import { MaterialModule } from "src/modules/material.module";

//app pages and components
import { CalendarComponent } from "./components/calendar/calendar.component";
import { StartingPageComponent } from "./pages/starting-page/starting-page.component";
import { ChartsPageComponent } from "./pages/charts-page/charts-page.component";
import { DetailsPageComponent } from "./pages/details-page/details-page.component";
import { CardComponent } from "./components/card/card.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AddExerciseNameModalComponent } from "./components/add-exercise-name-modal/add-exercise-name-modal.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { EditWorkoutComponent } from "./components/edit-workout/edit-workout.component";
import { EditWorkoutExercisesComponent } from "./components/edit-workout-exercises/edit-workout-exercises.component";
import { HeaderComponent } from "./components/header/header.component";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    StartingPageComponent,
    ChartsPageComponent,
    DetailsPageComponent,
    DashboardComponent,
    CardComponent,
    AddExerciseNameModalComponent,
    LoginPageComponent,
    SignupPageComponent,
    EditWorkoutComponent,
    EditWorkoutExercisesComponent,
    HeaderComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgApexchartsModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
        ],
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
