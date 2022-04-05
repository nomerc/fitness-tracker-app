import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { Workout } from "src/models/workout.model";

@Component({
  selector: "app-charts-page",
  templateUrl: "./charts-page.component.html",
  styleUrls: ["./charts-page.component.css"],
})
export class ChartsPageComponent implements OnInit {
  constructor(public dataService: DataService) {}

  // workouts: Workout[] = [];
  // trainingDates: string[] = [];
  chartData: Map<string, any> = new Map();

  ngOnInit(): void {
    this.getWorkoutsData();
  }

  getWorkoutsData() {
    let filteredData: Workout[];
    let exerciseNames: Set<string> = new Set();

    this.dataService.getAllWorkouts().subscribe((res) => {
      filteredData = this.excludeDefaultWorkoutData(res);

      filteredData.map((workout) => {
        for (let i = 0; i < workout.exercises.length; i++) {
          exerciseNames.add(workout.exercises[i].name);
        }
      });

      this.chartData = this.getWorkoutDataGroupedByExerciseName(
        filteredData,
        exerciseNames
      );
    });
  }

  excludeDefaultWorkoutData(workouts: Workout[]): Workout[] {
    let zeroDate = new Date(0);

    let filteredData = workouts.filter(
      (workout) => new Date(workout.date).getTime() !== zeroDate.getTime()
    );

    return filteredData;
  }

  getWorkoutDataGroupedByExerciseName(
    data: Workout[],
    exerciseNames: Set<string>
  ): Map<string, any> {
    let outputData: Map<string, any> = new Map();

    exerciseNames.forEach((name) => {
      data.map((workout) => {
        for (let i = 0; i < workout.exercises.length; i++) {
          if (workout.exercises[i].name === name) {
            outputData.set(name, {
              ...outputData.get(name),
              [workout.date]: workout.exercises[i].repsInSets,
            });
          }
        }
      });
    });

    return outputData;
  }
}
