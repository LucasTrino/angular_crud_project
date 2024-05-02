import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonTableHeadersService {
  getHeaders(): any {
    return [
      { label: 'Nome', id: 'nome' },
      { label: 'Idade', id: 'idade' },
      { label: 'Data Nascimento', id: 'dataNascimento' },
      { label: 'Telefone', id: 'telefone' },
      { label: 'Celular', id: 'celular' },
    ];
  }
}
