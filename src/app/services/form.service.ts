import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from '../interfaces/form-types';

import { DateService } from '../services/date.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private dateService: DateService) {}

  createForm(fields: FormField[]): FormGroup {
    const group: any = {};

    fields.forEach(field => {
      const control = new FormControl(field.value || '', field.validators || []);
      group[field.name] = control;
    });

    return new FormGroup(group);
  }

  validateFields(fields: FormField[], form: FormGroup): boolean {
    const validationResults = fields.map(field => this.isFieldValid(field.name, form));
    const allFieldsAreValid = validationResults.every(isValid => isValid);

    console.log(allFieldsAreValid);

    return allFieldsAreValid;
  }

  populateForm<T>(data: T, fields: any[], dynamicForm: FormGroup): void {
    fields.forEach(field => {
      let value: any = data[field.name as keyof T] || '';
      const control = dynamicForm.get(field.name);

      if (control) {

        // TODO: extender
        switch (field.type) {
          case 'date':
            value = this.dateService.formatDate(value, 'yyyy-mm-dd');
            break;
          case 'number':
            value = Number(value);
            break;
        }

        control.setValue(value);
      }
    });
  }

  private isFieldValid(fieldName: string, form: FormGroup): boolean {
    const control = form.get(fieldName);
    return control ? control.valid : false;
  }
}

