import { Component, Input } from '@angular/core';
import { UserMessages } from '../../core/classes/user-messages'

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss'
})
export class ErrorDisplayComponent {
 @Input() message: string = '';
 @Input() title: string = '';

 supportMessage = UserMessages.ERROR_SUPPORT_MESSAGE;

}
