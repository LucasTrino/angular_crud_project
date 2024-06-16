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
  @Input() fieldValues: any = {};
  @Input() title: string = '';
  @Input() id: string | null = null;

  @Output() validationResultEmitter = new EventEmitter<any>();

  form!: FormGroup;

  editMode: boolean = false;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.createForm(this.fields);
    console.log(this.fields)

    if (this.id) {
      this.editMode = true;
      this.formService.populateForm(this.fieldValues, this.fields, this.form);
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

  emitValidationResult(name: string): void {
    const fieldsAreValid = this.formService.validateFields(
      this.fields,
      this.form
    );
    this.validationResultEmitter.emit(!fieldsAreValid);
  }
}
