import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {}

  formatDate(dateString: string | number, format: 'mm/dd/yyyy' | 'yyyy-mm-dd'): string {
    const dateStr = String(dateString);
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return '';
    }

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    switch (format) {
      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'yyyy-mm-dd':
        return `${year}-${month}-${day}`;
      default:
        throw new Error(`Unsupported date format: ${format}`);
    }
  }
}
