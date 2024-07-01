import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, finalize, Observable, of, tap, throwError } from 'rxjs';

import { IPerson } from '../../core/interfaces/interface-persons-datas';
import { FormSection } from '../../core/interfaces/form-types';

import { CustomHttpsError } from '../../core/classes/custom-errors';
import { UserMessages } from '../../core/classes/user-messages';

import { CrudService } from '../../core/services/crud.service';
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
    private crudService: CrudService,
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

  ngOnInit(): void {
    const idParamExists = this.route.snapshot.paramMap.has('id');
    this.formSection = this.formPersonInputsService.getData();

    if (idParamExists) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.editMode = true;

      this.headerTitle = 'Editar';

      this.loading = true;

      this.getData().pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe({
        next: () => {
          this.setSubmitButtonState(false);
        },
        error: (error) => {
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

          this.setSubmitButtonState(true);

          throw error
        }
      });
    } else {
      this.headerTitle = 'Cadastrar';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async saveData(): Promise<void> {
    if (this.editMode) {
      this.updateRecord();
    } else {
      this.createData();
    }
  }

  getData(): Observable<any> {
    if(this.id !== null) {
      return this.crudService.getById('Pessoas', this.id).pipe(
        tap((data) => {
          const response = data;
          this.personDatas = response.data[0];
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
    } else {
      return of(null)
    }
  }

  updateRecord(): void {
    if (this.id !== null) {
      this.crudService.update('Pessoas', this.id, this.formsArr[0]).pipe(
        filter(result => result !== null),
        tap(() => {
          this.goBack();
        }),
        catchError(error => {
          console.error('Error updating record:', error);
          return throwError(() => error);
        })
      ).subscribe();
    }
  }

  createData(): void {
    this.crudService.create('Pessoas', this.formsArr[0]).pipe(
      filter(result => result !== null),
      tap(() => {
        this.goBack();
      }),
      catchError(error => {
        console.error('Error creating record:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  setSubmitButtonState(value: boolean): void {
    this.formButtons[1].isDisabled = value;
  }

  setFormValues(formValues: Object): void {
    this.formsArr[0] = formValues;
  }
}
