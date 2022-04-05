import { MatSnackBar } from "@angular/material/snack-bar";

export default class Utils {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }
}
