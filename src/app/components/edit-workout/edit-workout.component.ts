import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DataService } from "src/app/data.service";
import { Workout } from "src/models/workout.model";

@Component({
  selector: "app-edit-workout",
  templateUrl: "./edit-workout.component.html",
  styleUrls: ["./edit-workout.component.css"],
})
export class EditWorkoutComponent implements OnInit {
  @Input() workout!: Workout;
  @Input() date!: number;

  constructor(
    private router: Router,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.date);
  }

  //-----workout data actions-----
  saveWorkoutData() {
    this.workout.date = this.date;
    this.dataService.addOrUpdateWorkout(this.workout).subscribe((res) => {
      this.openSnackBar(`Workout saved`, "Close");
      this.navigateToMainPaige();
    });
  }

  saveWorkoutAsTemplate() {
    this.workout.date = 0;
    this.dataService.addOrUpdateWorkout(this.workout).subscribe((res) => {
      this.openSnackBar("Default workout saved", "Close");
    });
  }

  deleteWorkout() {
    this.dataService.deleteWorkout(this.workout).subscribe(() => {
      this.openSnackBar(`Workout deleted`, "Close");
      this.navigateToMainPaige();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }

  navigateToMainPaige() {
    this.router.navigate(["/"]);
  }
}
