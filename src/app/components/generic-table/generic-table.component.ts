import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
})
export class GenericTableComponent {
  @Input() datas: any[] = [];
  @Input() headers: any[] = [];
  @Input() bordered: boolean = false;
  @Input() actions: any[] = [];
}
