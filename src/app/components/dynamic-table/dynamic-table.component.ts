import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TablePlaceholderComponent } from '../table-placeholder/table-placeholder.component';
import { ErrorDisplayComponent } from '../error-display/error-display.component';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [RouterLink, TablePlaceholderComponent, ErrorDisplayComponent],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTable {
  @Input()
  datas!: any[];
  @Input()
  headers!: any[];
  @Input()
  loading!: boolean;
  @Input() error!: { isActive: boolean; message: string; };

  handleAction(action: string, rowData: any) {
    console.log(`Performing ${action} action for row with data:`, rowData);
  }

}
