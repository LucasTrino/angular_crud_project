import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonType, ButtonService } from '../../core/services/button.service';

@Component({
  selector: 'app-form-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-footer.component.html',
  styleUrl: './form-footer.component.scss'
})
export class FormFooterComponent {
  @Input() arrButtons: any[] = [];

  constructor(private buttonService: ButtonService) {}

  getButtonClass(type: ButtonType): string {
    return this.buttonService.getButtonClass(type);
  }

}
