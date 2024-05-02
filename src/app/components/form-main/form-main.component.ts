import { Component, OnInit } from '@angular/core';
import { FormSectionComponent } from '../form-section/form-section.component';
import { AddressFormSectionComponent } from '../address-form-section/address-form-section.component';

import { FormPersonInputsService } from '../../services/form-person-inputs.service';
import { AddressTableHeadersService } from '../../services/address-table-headers.service';
import { AddressTableHeaders } from '../../interfaces/interface-address-table-headers';

import { ActivatedRoute } from '@angular/router';

interface FormDataItem {
  title: string;
  type: string;
  placeholder: string;
}

interface FormData {
  personalDatas: FormDataItem[];
  personalAddresses: FormDataItem[];
}

interface AddressData {
  public: string;
  number: string;
  neighbordhood: string;
  city: string;
  uf: string;
}

@Component({
  selector: 'app-form-main',
  standalone: true,
  imports: [FormSectionComponent, AddressFormSectionComponent],
  templateUrl: './form-main.component.html',
  styleUrl: './form-main.component.scss',
})
export class FormMainComponent {
  private formPersonInputsService: FormPersonInputsService;
  private addressTableHeadersService: AddressTableHeadersService;
  private route: ActivatedRoute;

  constructor(
    formPersonInputsService: FormPersonInputsService,
    addressTableHeadersService: AddressTableHeadersService,
    route: ActivatedRoute
  ) {
    this.formPersonInputsService = formPersonInputsService;
    this.addressTableHeadersService = addressTableHeadersService;
    this.route = route;
  }

  message!: string;

  formData!: FormData;
  addressTableHeaders!: AddressTableHeaders[];

  addressArray: AddressData[] = [];

  data = [
    {
      id: 0,
      public: 'Lucas',
      number: '1',
      neighbordhood: 'lol',
      city: 'lol',
      uf: 'lol',
    },
  ];

  ngOnInit(): void {
    this.formData = this.formPersonInputsService.getData();
    this.addressTableHeaders = this.addressTableHeadersService.getHeaders();

    this.route.paramMap.subscribe((params) => {
      // if (params.has('id')) {
      //   const id = params.get('id');
      //   console.log('ID parameter value:', id);
      // } else {
      //   console.log('ID parameter not found');
      // }
    });
  }

  addAddress(message: string) {
    this.message = message;
    console.log(this.message);
  }
}
