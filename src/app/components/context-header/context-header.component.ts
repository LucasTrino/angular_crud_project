import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-context-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './context-header.component.html',
  styleUrl: './context-header.component.scss',
})
export class ContextHeader {
  @Input() title: string = '';
  @Input() showButton: boolean = true;
}
