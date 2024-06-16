import { Injectable } from '@angular/core';
import { FormSection } from '../interfaces/form-types';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class FormPersonInputsService {
  getData(): FormSection {
    return {
      personalDatas: [
        { type: 'text', label: 'Nome', name: 'name', placeholder: '', validators: [Validators.required]},
        { type: 'number', label: 'Idade', name: 'age', placeholder: '' , validators: [Validators.required]},
        { type: 'email', label: 'Email', name: 'email', placeholder: 'user@host.com' , validators: [Validators.required]},
        { type: 'date', label: 'Data Nascimento', name: 'birthDate', placeholder: '' , validators: [Validators.required]},
        { type: 'text', label: 'Telefone', name: 'phoneNumber', placeholder: '(00) 00000-0000' , validators: [Validators.required]},
        { type: 'text', label: 'Celular', name: 'cellNumber', placeholder: '(00) 00000-0000' , validators: [Validators.required]},
      ],
      personalAddresses: [
        { type: 'text', label: 'Logradouro', name: 'public', placeholder: '' , validators: [Validators.required]},
        { type: 'text', label: 'Numero', name: 'number', placeholder: '' , validators: [Validators.required]},
        { type: 'text', label: 'Bairro', name: 'neighbordhood', placeholder: '' , validators: [Validators.required]},
        { type: 'text', label: 'Cidade', name: 'city', placeholder: '' , validators: [Validators.required]},
        { type: 'text', label: 'UF', name: 'uf', placeholder: '' , validators: [Validators.required]},
      ],
    };
  }
}
