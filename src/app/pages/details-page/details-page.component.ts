import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/data.service";
import { Exercise } from "src/models/exercise.model";
import { Workout } from "src/models/workout.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExerciseName } from "src/models/exerciseName.model";
import { MatDialog } from "@angular/material/dialog";
import { AddExerciseNameModalComponent } from "src/app/components/add-exercise-name-modal/add-exercise-name-modal.component";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.css"],
})
export class DetailsPageComponent implements OnInit {
  exercises!: ExerciseName[];
  date!: number;
  exerciseName!: string;

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
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExerciseNamesFromDB();

    this.route.paramMap.subscribe((params) => {
      //get the date from params or use current date
      this.date = Date.parse(params.get("date") ?? Date());
    });
    this.getWorkoutData();
  }

  //-----workout data actions-----
  getWorkoutData() {
    this.dataService.getWorkout(this.date).subscribe((res) => {
      if (res.date && res.exercises) this.workout = res;
    });
  }

  //-----exercise data actions-----
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

  //-----exercise names data actions-----
  addNewExerciseName(): void {
    const dialogRef = this.dialog.open(AddExerciseNameModalComponent, {
      width: "350px",
      data: { exerciseName: this.exerciseName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.exerciseName = result;
      this.dataService.addExerciseName(this.exerciseName).subscribe(() => {
        if (this.exerciseName) {
          this.openSnackBar(
            `${this.exerciseName} added to exercise names list`,
            "Close"
          );
        }
        this.getExerciseNamesFromDB();
      });
    });
  }

  getExerciseNamesFromDB() {
    this.dataService.getAllExerciseNames().subscribe((res) => {
      this.exercises = res;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }

  navigateToMainPaige() {
    this.router.navigate(["/"]);
  }

  indexTracker(index: number, value: any) {
    return index;
  }
}
