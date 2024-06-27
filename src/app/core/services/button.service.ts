import { Injectable } from '@angular/core';

export type ButtonType = 'primary' | 'danger' | 'success' | 'warning' | 'secondary';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  private buttonTypesClasses: Record<ButtonType, string> = {
    'primary': 'btn-primary',
    'danger': 'btn-danger',
    'success': 'btn-success',
    'warning': 'btn-warning',
    'secondary': 'btn-secondary'
  };

  getButtonClass(type: ButtonType): string {
    return this.buttonTypesClasses[type];
  }

}
