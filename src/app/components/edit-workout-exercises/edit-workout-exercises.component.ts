import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from "src/app/data.service";
import { Exercise } from "src/models/exercise.model";
import { ExerciseName } from "src/models/exerciseName.model";
import { Workout } from "src/models/workout.model";
import { AddExerciseNameModalComponent } from "../add-exercise-name-modal/add-exercise-name-modal.component";
import Utils from "src/utils/utils";

@Component({
  selector: "app-edit-workout-exercises",
  templateUrl: "./edit-workout-exercises.component.html",
  styleUrls: ["./edit-workout-exercises.component.css"],
})
export class EditWorkoutExercisesComponent implements OnInit {
  @Input() workout!: Workout;
  exerciseName!: string;
  exercises!: ExerciseName[];

  utils = new Utils(this._snackBar);

  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExerciseNamesFromDB();
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
          this.utils.openSnackBar(
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

  indexTracker(index: number, value: any) {
    return index;
  }
}
