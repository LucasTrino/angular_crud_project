import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { FormField } from '../interfaces/form-types';

import { DateService } from '../services/date.service';
import { ButtonType } from '../services/button.service';

export interface FormButton {
  title: string;
  type: ButtonType;
  isDisabled: boolean;
  action: () => void;
}

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

  getFormButtons(goBack: () => void, saveData: () => void): FormButton[] {
    return [
      {
        title: 'Voltar',
        type: 'primary',
        isDisabled: false,
        action: goBack
      },
      {
        title: 'Salvar',
        type: 'success',
        isDisabled: true,
        action: saveData
      }
    ];
  }

  validateFields(fields: FormField[], form: FormGroup): boolean {
    const validationResults = fields.map(field => this.isFieldValid(field.name, form));
    const allFieldsAreValid = validationResults.every(isValid => isValid);

    return allFieldsAreValid;
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const birthDate = new Date(control.value);
    if (birthDate >= today) {
      return { 'invalidDate': true };
    }
    return null;
  }

  private isFieldValid(fieldName: string, form: FormGroup): boolean {
    const control = form.get(fieldName);
    return control ? control.valid : false;
  }

}

