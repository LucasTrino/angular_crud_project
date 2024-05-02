import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { AddressTableHeaders } from '../../interfaces/interface-address-table-headers';

@Component({
  selector: 'app-address-form-section',
  standalone: true,
  imports: [GenericTableComponent],
  templateUrl: './address-form-section.component.html',
  styleUrl: './address-form-section.component.scss',
})
export class AddressFormSectionComponent {
  @Output() addAddress = new EventEmitter<string>();

  @Input() addressData: any[] = [];
  @Input()
  headersColumns!: AddressTableHeaders[];

  delete(): void {
    console.log('deletando...')
  }
  edit(): void {
    console.log('editando...')
  }

  actionsTable = [
    {
      icon: 'delete',
      type: 'danger',
      title: 'Excluir',
      action: this.delete.bind(this),
    },
    {
      icon: 'delete',
      type: 'warning',
      title: 'Opção',
      action: this.edit.bind(this),
    },
  ];

  throwAddAddress() {
    this.addAddress.emit('Adicionando endereço');
  }

  // ngOnInit(): void {

  // }
}
