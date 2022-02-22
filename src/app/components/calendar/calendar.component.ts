import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from "@angular/material/datepicker";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @ViewChild("calendar") calendar!: MatCalendar<Date>;
  selected!: Date | null;
  selectedDate: any;
  minDate: Date | null = null;
  workoutDays: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getAllWorkouts().subscribe((res) => {
      res.map((el) => this.workoutDays.push(el.date));
      this.calendar.updateTodaysDate();
    });
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.workoutDays
        .map((strDate) => new Date(strDate))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );

      return highlightDate ? "workout-day" : "";
    };
  }

  showDetails() {
    this.router.navigate([`/details/:${this.selected}`]);
  }
}
