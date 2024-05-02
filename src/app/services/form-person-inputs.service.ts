import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormPersonInputsService {
  getData(): any {
    return {
      personalDatas: [
        { id: 'name', title: 'Nome', type: 'text', placeholder: '' },
        { id: 'age', title: 'Idade', type: 'text', placeholder: '' },
        { id: 'email', title: 'Email', type: 'email', placeholder: 'user@host.com' },
        { id: 'birth', title: 'Data Nascimento', type: 'date', placeholder: '' },
        { id: 'phone', title: 'Telefone', type: 'text', placeholder: '(00) 00000-0000' },
        { id: 'cel', title: 'Celular', type: 'text', placeholder: '(00) 00000-0000' },
      ],
      personalAddresses: [
        { id: 'public', title: 'Logradouro', type: 'text', placeholder: '' },
        { id: 'number', title: 'Numero', type: 'text', placeholder: '' },
        { id: 'neighbordhood', title: 'Bairro', type: 'text', placeholder: '' },
        { id: 'city', title: 'Cidade', type: 'text', placeholder: '' },
        { id: 'uf', title: 'UF', type: 'text', placeholder: '' },
      ],
    };
  }
}
