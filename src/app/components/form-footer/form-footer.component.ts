import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss'
})
export class FormFooterComponent {
  @Input() IsDisabled: boolean = false;
  @Input() successAction: (() => void) | null = null;

  onSuccessAction() {
    if (this.successAction) {
      this.successAction();
    }
  }
}
