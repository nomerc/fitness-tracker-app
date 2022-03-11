import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  exerciseName: string;
}

@Component({
  selector: "app-add-exercise-name-modal",
  templateUrl: "./add-exercise-name-modal.component.html",
  styleUrls: ["./add-exercise-name-modal.component.css"],
})
export class AddExerciseNameModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddExerciseNameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}
  onCancel(): void {
    this.dialogRef.close();
  }
}
