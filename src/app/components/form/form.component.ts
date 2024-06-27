import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { IPerson } from '../../core/interfaces/interface-persons-datas';
import { FormSection } from '../../core/interfaces/form-types';

import { CustomHttpsError } from '../../core/classes/custom-errors';
import { UserMessages } from '../../core/classes/user-messages';

import { ApiService } from '../../core/services/api.service';
import { FormPersonInputsService } from '../../core/services/form-person-inputs.service';
import { FormButton, FormService } from '../../core/services/form.service';

import { FormFooterComponent } from '../form-footer/form-footer.component';
import { FormMainComponent } from '../form-main/form-main.component';
import { ContextHeader } from '../context-header/context-header.component';
import { ErrorDisplayComponent } from '../error-display/error-display.component';
import { FormPlaceholderComponent } from '../form-placeholder/form-placeholder.component';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [
    HttpClientModule,
    FormFooterComponent,
    FormMainComponent,
    ContextHeader,
    ErrorDisplayComponent,
    FormPlaceholderComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  formButtons: FormButton[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formPersonInputsService: FormPersonInputsService,
    private formService: FormService,
    private apiService: ApiService
  ) {
    this.formButtons = this.formService.getFormButtons(
      () => this.goBack(),
      () => this.saveData()
    );
  }

  http = inject(HttpClient);

  id: string | null = null;
  editMode: boolean = false;

  headerTitle = '';
  showHeaderButton = false;
  submitButtonIsDisabled = true;

  loading: boolean = false;

  formsArr: any[] = [];

  errorObj: { isActive: boolean; message: string } = {
    isActive: false,
    message: '',
  };

  // TODO: error: Error | null;

  formSection!: FormSection;

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

  async ngOnInit(): Promise<void> {
    const idParamExists = this.route.snapshot.paramMap.has('id');
    this.formSection = this.formPersonInputsService.getData();

    if (idParamExists) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.editMode = true;

      this.headerTitle = 'Editar';

      this.loading = true;

      try {
        await this.getData();

        //TODO: melhorar isso.
        this.setSubmitButtonState(false);
      } catch (error) {
        let errorMessage: string;

        if (error instanceof CustomHttpsError) {
          errorMessage = error.message;
        } else {
          console.error('Unexpected error:', error);
          errorMessage = UserMessages.ERROR_UNKNOWN;
        }

        this.errorObj = {
          isActive: true,
          message: errorMessage,
        };

        //TODO: melhorar isso.
        this.setSubmitButtonState(true);

        throw error;
      } finally {
        this.loading = false;
      }
    } else {
      this.headerTitle = 'Cadastrar';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  saveData() {
    if (this.editMode) {
      this.editData();
    } else {
      this.createData();
    }
  }

  async getData(): Promise<void> {
    const response = await firstValueFrom(
      this.apiService.get(`Pessoas/${this.id}`)
    );
    this.personDatas = response.data[0];
  }

  async editData(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.apiService.put(`Pessoas/${this.id}`, this.formsArr[0])
      );
      console.log('Data successfully edited', response.code);
    } catch (error) {
      console.error('Error edit data', error);
    }
  }

  async createData(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.apiService.post(`Pessoas`, this.formsArr[0])
      );
      console.log('Data successfully create', response.code);
    } catch (error) {
      console.error('Error create data', error);
    }
  }

  setSubmitButtonState(value: boolean): void {
    this.formButtons[1].isDisabled = value;
  }

  setFormValues(formValues: Object): void {
    this.formsArr[0] = formValues;
  }
}
