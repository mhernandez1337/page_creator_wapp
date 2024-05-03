import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  openErrorSnackBar(message) {
      this._snackBar.open(message, 'Close', {
        panelClass: "error-snack-bar",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    openSuccessSnackBar(message) {
      let snackBarRef = this._snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      snackBarRef.onAction().subscribe(() => {
        // if(link == 'Undo')
        // this.undoCancel();
      });
    }
}
