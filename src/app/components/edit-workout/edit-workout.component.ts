import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DataService } from "src/app/data.service";
import { Workout } from "src/models/workout.model";
import Utils from "src/utils/utils";

@Component({
  selector: "app-edit-workout",
  templateUrl: "./edit-workout.component.html",
  styleUrls: ["./edit-workout.component.css"],
})
export class EditWorkoutComponent implements OnInit {
  @Input() workout!: Workout;
  @Input() date!: number;

  utils = new Utils(this._snackBar);

  constructor(
    private router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //-----workout data actions-----
  saveWorkoutData() {
    this.workout.date = this.date;
    this.dataService.addOrUpdateWorkout(this.workout).subscribe((res) => {
      this.utils.openSnackBar(`Workout saved`, "Close");
      this.navigateToMainPaige();
    });
  }

  saveWorkoutAsTemplate() {
    this.workout.date = 0;
    this.dataService.addOrUpdateWorkout(this.workout).subscribe((res) => {
      this.utils.openSnackBar("Default workout saved", "Close");
    });
  }

  deleteWorkout() {
    this.dataService.deleteWorkout(this.workout).subscribe(() => {
      this.utils.openSnackBar(`Workout deleted`, "Close");
      this.navigateToMainPaige();
    });
  }

  navigateToMainPaige() {
    this.router.navigate(["/calendar"]);
  }
}
