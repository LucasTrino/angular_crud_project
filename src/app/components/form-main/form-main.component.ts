import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { FormSectionComponent } from '../form-section/form-section.component';
// import { AddressFormSectionComponent } from '../address-form-section/address-form-section.component';

// import { IAddress } from '../../interfaces/interface-address';
// import { FormSection } from '../../interfaces/form-types';
import { FormField } from '../../interfaces/form-types';
// import { AddressTableHeaders } from '../../interfaces/interface-address-table-headers';

// import { FormPersonInputsService } from '../../services/form-person-inputs.service';
// import { AddressTableHeadersService } from '../../services/address-table-headers.service';

@Component({
  selector: 'app-form-main',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormSectionComponent,
    // AddressFormSectionComponent
  ],
  templateUrl: './form-main.component.html',
  styleUrl: './form-main.component.scss',
})
export class FormMainComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() fields: FormField[] = [];
  @Input() fieldsValues: any = {};

  @Output() SubmitButtonStateEmitter = new EventEmitter<any>();

  // private formPersonInputsService: FormPersonInputsService;
  // private addressTableHeadersService: AddressTableHeadersService;

  constructor(
    // formPersonInputsService: FormPersonInputsService,
    // addressTableHeadersService: AddressTableHeadersService,
  ) {
    // this.formPersonInputsService = formPersonInputsService;
    // this.addressTableHeadersService = addressTableHeadersService;
  }

  // message!: string;

  // formSection!: FormSection;

  // addressTableHeaders!: AddressTableHeaders[];
  // addressArray: IAddress[] = [];
  // addressData = [];

  async ngOnInit(): Promise<void> {
    // this.formSection = this.formPersonInputsService.getData();
    // this.addressTableHeaders = this.addressTableHeadersService.getHeaders();
  }

  emitSubmitButtonState(isDisabled: boolean): void {
    this.SubmitButtonStateEmitter.emit(isDisabled);
  }

  // addAddress(message: string) {
  //   this.message = message;
  //   console.log(this.message);
  // }
}
