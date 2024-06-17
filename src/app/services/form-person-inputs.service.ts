import { Injectable } from '@angular/core';
import { FormSection } from '../interfaces/form-types';
import { Validators } from '@angular/forms';

import { FormService } from '../services/form.service';

@Injectable({
  providedIn: 'root',
})
export class FormPersonInputsService {
  constructor(private formService: FormService) {}

  //TODO: separar validator para um novo service
  //TODO: criar um objeto especifico para dicas e mensagens dos
  // validadores e validadores baseado em 'tipos personalizados'
  getData(): FormSection {
    return {
      personalDatas: [
        {
          type: 'text',
          label: 'Nome',
          name: 'name',
          placeholder: '',
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
            Validators.pattern('^[a-zA-Z ]*$'),
          ],
        },
        {
          type: 'number',
          label: 'Idade',
          name: 'age',
          placeholder: '',
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(120),
            Validators.pattern('^[0-9]*$'),
          ],
        },
        {
          type: 'email',
          label: 'Email',
          name: 'email',
          placeholder: 'user@host.com',
          addOn: '@',
          validators: [Validators.required, Validators.email],
        },
        {
          type: 'date',
          label: 'Data Nascimento',
          name: 'birthDate',
          placeholder: '',
          validators: [
            Validators.required,
            this.formService.dateValidator
          ],
        },
        {
          type: 'text',
          label: 'Telefone',
          name: 'phoneNumber',
          placeholder: '(00) 0000-0000',
          addOn: '(+55)',
          validators: [
            Validators.required,
            Validators.pattern('^\\(\\d{2}\\) \\d{4}-\\d{4}$'),
          ],
        },
        {
          type: 'text',
          label: 'Celular',
          name: 'cellNumber',
          placeholder: '(00) 00000-0000',
          addOn: '(+55)',
          validators: [
            Validators.required,
            Validators.pattern('^\\(\\d{2}\\) \\d{5}-\\d{4}$'),
          ],
        },
      ],
      personalAddresses: [
        {
          type: 'text',
          label: 'Logradouro',
          name: 'public',
          placeholder: '',
          validators: [Validators.required],
        },
        {
          type: 'text',
          label: 'Numero',
          name: 'number',
          placeholder: '',
          validators: [Validators.required],
        },
        {
          type: 'text',
          label: 'Bairro',
          name: 'neighbordhood',
          placeholder: '',
          validators: [Validators.required],
        },
        {
          type: 'text',
          label: 'Cidade',
          name: 'city',
          placeholder: '',
          validators: [Validators.required],
        },
        {
          type: 'text',
          label: 'UF',
          name: 'uf',
          placeholder: '',
          validators: [Validators.required],
        },
      ],
    };
  }
}
