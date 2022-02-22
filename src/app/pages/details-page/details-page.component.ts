import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { DataService } from "src/app/data.service";
import { Exercise } from "src/models/exercise.model";
import { Workout } from "src/models/workout.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.css"],
})
export class DetailsPageComponent implements OnInit {
  workout: Workout = {
    date: Date.now(),
    exercises: [
      { name: "Pullups", repsInSets: [4, 4, 4, 4, 0] },
      { name: "Dips", repsInSets: [3, 3, 3, 3, 0] },
      { name: "Rows", repsInSets: [10, 10, 8, 0, 0] },
      { name: "Squats", repsInSets: [18, 17, 17, 0, 0] },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  date!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      //get the date from params or use current date
      this.date = Date.parse(params.get("date") ?? Date());
    });
    this.getWorkoutData();
  }

  getWorkoutData() {
    this.dataService.getWorkout(this.date).subscribe((res) => {
      if (res.date && res.exercises) this.workout = res;
    });
  }

  saveWorkoutData() {
    this.workout.date = this.date;
    this.dataService.addOrUpdateWorkout(this.workout).subscribe((res) => {
      this.openSnackBar(`Workout saved`, "Close");
      this.toMainPaige();
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
      this.toMainPaige();
    });
  }

  addExercise() {
    this.workout.exercises.push({
      name: "Exercise name",
      repsInSets: [0, 0, 0, 0, 0],
    });
  }

  deleteExercise(exercise: Exercise) {
    this.workout.exercises = this.workout.exercises.filter(
      (el) => el.name !== exercise.name
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }

  toMainPaige() {
    this.router.navigate(["/"]);
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
