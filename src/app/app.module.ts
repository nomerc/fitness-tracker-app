import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

//app pages and components
import { CalendarComponent } from "./components/calendar/calendar.component";
import { StartingPageComponent } from "./pages/starting-page/starting-page.component";
import { ChartsPageComponent } from "./pages/charts-page/charts-page.component";
import { DetailsPageComponent } from "./pages/details-page/details-page.component";
import { CardComponent } from "./components/card/card.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

//Layout
import { FlexLayoutModule } from "@angular/flex-layout";

//charts
import { NgApexchartsModule } from "ng-apexcharts";

//angular material
import { MaterialModule } from "src/modules/material.module";
import { AddExerciseNameModalComponent } from './components/add-exercise-name-modal/add-exercise-name-modal.component';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
