import { Injectable, NgZone, Injector} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogComponent } from '../../components/dialog-component/dialog-component.component';
import { UserMessages } from '../classes/user-messages';

type dialogType = 'CONFIRM_UPDATE' | 'CONFIRM_DELETE';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone, private dialog: MatDialog) {}
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
  showConfirmation(type: dialogType): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '45%',
      data: {
        title: 'Confirmar Ação',
        content: UserMessages[type],
      }
    });

    return dialogRef.afterClosed();
  }
}
