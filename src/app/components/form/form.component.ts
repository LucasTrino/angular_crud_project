import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { IPerson } from '../../interfaces/interface-persons-datas';
import { FormSection } from '../../interfaces/form-types';

import { FormPersonInputsService } from '../../services/form-person-inputs.service';
import { FormButton, FormService } from '../../services/form.service';

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
    FormPlaceholderComponent
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
    private formService: FormService
  ) {
    this.formButtons = this.formService.getFormButtons(() => this.goBack(), () => this.saveData());
  }

  goBack() {
    this.router.navigate(['/']);
  }

  saveData() {
    console.log('Saving data');
  }

  http = inject(HttpClient);

  id: string | null = null;

  headerTitle = '';
  showHeaderButton = false;
  submitButtonIsDisabled = true;

  loading: boolean = false;

  error: { isActive: boolean; message: string } = {
    isActive: false,
    message: '',
  };

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
      this.headerTitle = 'Editar';

      try {
        await this.loadData();
        //TODO: melhorar isso.
        this.setSubmitButtonState(false)
      } catch (e) {
        throw e;
      }

    } else {
      this.headerTitle = 'Cadastrar';
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

  setSubmitButtonState(value: boolean): void {
    this.formButtons[1].isDisabled = value;
  }

}
