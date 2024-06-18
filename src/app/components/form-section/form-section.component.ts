import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';

import { FormField } from '../../interfaces/form-types';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss',
})
export class FormSectionComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() fieldsValues: any = {};
  @Input() title: string = '';
  @Input() id: string | null = null;

  @Output() validationResultEmitter = new EventEmitter<any>();
  @Output() formFieldsValuesEmmiter = new EventEmitter<any>();

  form!: FormGroup;

  editMode: boolean = false;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.createForm(this.fields);

    if (this.id) {
      this.editMode = true;
      this.formService.populateForm(this.fieldsValues, this.fields, this.form);
    }
  }

  hasRequiredValidator(validators?: ValidatorFn[]): boolean {
    if (!validators) {
      return false;
    }

    for (let validator of validators) {
      if (validator === Validators.required) {
        return true;
      }

      const validatorName = validator.name || validator.toString();
      if (validatorName.includes('required')) {
        return true;
      }
    }

    return false;
  }

  emitValidationResult(): void {
    const fieldsAreValid = this.formService.validateFields(
      this.fields,
      this.form
    );
    this.validationResultEmitter.emit(!fieldsAreValid);
  }

  emitFormFieldsValues(): void {
    let formValues = this.form.value;
    console.log(formValues);
    this.formFieldsValuesEmmiter.emit(formValues);
  }

  handleInput(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {

      if (controlName === 'cellNumber' || controlName === 'phoneNumber') {
        control.setValue(this.formatPhoneNumber(control.value), { emitEvent: false });
      }

      this.emitValidationResult();
      this.emitFormFieldsValues();
    }
  }

  formatPhoneNumber(value: string): string {
    let newValue = value.replace(/\D/g, '');

    if (newValue.length > 11) {
        newValue = newValue.substring(0, 11);
    }

    if (newValue.length > 6) {
        if (newValue.length > 10) {
            newValue = `(${newValue.substring(0, 2)}) ${newValue.substring(2, 7)}-${newValue.substring(7, 11)}`;
        } else {
            newValue = `(${newValue.substring(0, 2)}) ${newValue.substring(2, 6)}-${newValue.substring(6, 10)}`;
        }

    } else if (newValue.length > 2) {
        newValue = `(${newValue.substring(0, 2)}) ${newValue.substring(2)}`;
    } else if (newValue.length > 0) {
        newValue = `(${newValue}`;
    }

    return newValue;
  }

}


