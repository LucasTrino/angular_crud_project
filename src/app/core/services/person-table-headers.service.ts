import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonTableHeadersService {
  getHeaders(): any {
    return [
      { label: 'Nome', id: 'name' },
      { label: 'Idade', id: 'age' },
      { label: 'Data Nascimento', id: 'birthDate' },
      { label: 'Telefone', id: 'phoneNumber' },
      { label: 'Celular', id: 'cellNumber' },
    ];
  }
}
