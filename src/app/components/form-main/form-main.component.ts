import { Component, OnInit, inject, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { FormSectionComponent } from '../form-section/form-section.component';
import { AddressFormSectionComponent } from '../address-form-section/address-form-section.component';
import { FormPlaceholderComponent } from '../form-placeholder/form-placeholder.component';
import { ErrorDisplayComponent } from '../error-display/error-display.component';

import { IPerson } from '../../interfaces/interface-persons-datas';
import { IAddress } from '../../interfaces/interface-address';
import { FormSection } from '../../interfaces/form-types';
import { AddressTableHeaders } from '../../interfaces/interface-address-table-headers';

import { FormPersonInputsService } from '../../services/form-person-inputs.service';
import { AddressTableHeadersService } from '../../services/address-table-headers.service';

@Component({
  selector: 'app-form-main',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormSectionComponent,
    AddressFormSectionComponent,
    FormPlaceholderComponent,
    ErrorDisplayComponent
  ],
  templateUrl: './form-main.component.html',
  styleUrl: './form-main.component.scss',
})
export class FormMainComponent implements OnInit {
  @Input() id: string | null = null;

  @Output() SubmitButtonStateEmitter = new EventEmitter<any>();

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

  formSection!: FormSection;

  addressTableHeaders!: AddressTableHeaders[];
  addressArray: IAddress[] = [];
  addressData = [];

  http = inject(HttpClient);

  personDatas: IPerson = {
    id: 0,
    name: '',
    birthDate: '',
    age: 0,
    email: '',
    phoneNumber: '',
    cellNumber: '',
    register: '',
    change: '',
  };

  loading: boolean = false;

  error: { isActive: boolean; message: string } = {
    isActive: false,
    message: '',
  };

  async ngOnInit(): Promise<void> {
    this.formSection = this.formPersonInputsService.getData();
    this.addressTableHeaders = this.addressTableHeadersService.getHeaders();

    const idParamExists = this.route.snapshot.paramMap.has('id');

    if (idParamExists) {
      this.loadData().then(() => {
        this.emitSubmitButtonState(false)
      });
    }
  }

  async loadData(): Promise<void> {
    this.loading = true;
    try {
      const response = await lastValueFrom(
        this.http.get<{ data?: IPerson[] }>(
          `http://localhost:3000/api/Pessoas/${this.id}`
        )
      );
      const data = response?.data;

      if (data !== undefined) {
        this.personDatas = data[0];
      } else {
        throw new Error('Data is undefined');
      }
    } catch (error) {
      this.error = {
        isActive: true,
        message:
          'Não foi possível carregar os dados. Recarregue a página ou entre em contato com o administrador.',
      };
    } finally {
      this.loading = false;
    }
  }

  emitSubmitButtonState(isDisabled: boolean): void {
    this.SubmitButtonStateEmitter.emit(isDisabled);
  }


  addAddress(message: string) {
    this.message = message;
    console.log(this.message);
  }
}
