import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ExerciseName } from "src/models/exerciseName.model";
import { Workout } from "src/models/workout.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
  }

  //------workout data operations------

  getWorkout(date: Number): Observable<Workout> {
    return this.http.get<Workout>(`${this.ROOT_URL}/workouts/${date}`);
  }

  getAllWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.ROOT_URL}/workouts`);
  }

  addWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.ROOT_URL}/workouts`, workout);
  }

  addOrUpdateWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      `${this.ROOT_URL}/workouts/${workout.date}`,
      workout
    );
  }

  deleteWorkout(workout: Workout): Observable<Workout> {
    return this.http.delete<Workout>(
      `${this.ROOT_URL}/workouts/${workout.date}`
    );
  }

  //------exercise name data operations------
  getAllExerciseNames(): Observable<ExerciseName[]> {
    return this.http.get<ExerciseName[]>(`${this.ROOT_URL}/exercise_names`);
  }

  addExerciseName(name: string): Observable<ExerciseName> {
    return this.http.post<ExerciseName>(`${this.ROOT_URL}/exercise_names`, {
      name,
    });
  }

  // updateArticle(id: string, article: Workout): Observable<Workout> {
  //   return this.http.patch<Workout>(`${this.ROOT_URL}/articles/${id}`, article);
  // }

  // deleteArticle(id: string): Observable<Workout> {
  //   const url = `${this.ROOT_URL}/articles/${id}`;
  //   return this.http.delete<Workout>(url).pipe(catchError(this.handleError));
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `,
  //       error.error
  //     );
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError('Something bad happened; please try again later.');
  // }
}
