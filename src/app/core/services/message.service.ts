import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
// , private dialog: MatDialog
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  // Display success message
  showSuccess(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Fechar', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
    });
  }

  // Display error message
  showError(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    });
  }

  // Display informational message
  showInfo(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Fechar', {
        duration: 5000,
        panelClass: ['info-snackbar'],
      });
    });
  }

  // Display warning message
  showWarning(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Fechar', {
        duration: 5000,
        panelClass: ['warning-snackbar'],
      });
    });
  }

  // Display confirmation dialog
  // showConfirmation(message: string): Observable<boolean> {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '300px',
  //     data: { message }
  //   });

  //   return dialogRef.afterClosed();
  // }
}
