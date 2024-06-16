import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './table-placeholder.component.html',
  styleUrl: './table-placeholder.component.scss'
})
export class TablePlaceholderComponent {
  @Input() headers_length!: number;
  @Input() items_length!: number;
}
