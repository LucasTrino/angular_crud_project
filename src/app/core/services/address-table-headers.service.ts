import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressTableHeadersService {
  getHeaders(): any {
    return [
      { label: 'Logradouro', id: 'public' },
      { label: 'Numero', id: 'number' },
      { label: 'Bairro', id: 'neighbordhood' },
      { label: 'Cidade', id: 'city' },
      { label: 'UF', id: 'uf' },
    ];
  }
}
