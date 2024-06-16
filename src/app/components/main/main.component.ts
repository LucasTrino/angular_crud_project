import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { PersonTableHeadersService } from '../../services/person-table-headers.service';
import { IPerson } from '../../interfaces/interface-persons-datas';

import { lastValueFrom } from 'rxjs';

import { DynamicTable } from '../dynamic-table/dynamic-table.component';
import { ContextHeader } from '../context-header/context-header.component';

interface IPersonResponse {
  data: IPerson[];
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule, DynamicTable, ContextHeader],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  constructor(
    private personTableHeadersService: PersonTableHeadersService,
  ) {}

  http = inject(HttpClient);

  tableData: IPerson[] = [];
  tableHeaders: any[] = [];
  tableLoading: boolean = true;
  tableError: { isActive: boolean; message: string } = {
    isActive: false,
    message: '',
  };

  async ngOnInit(): Promise<void> {
    this.tableHeaders = this.personTableHeadersService.getHeaders();
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.tableLoading = true;
    try {
      const response = await lastValueFrom(this.http.get<IPersonResponse>('http://localhost:3000/api/Pessoas/GetAll'));
      const data = response?.data;

      if (data !== undefined) {
        this.tableData = data;
      } else {
        throw new Error('Data is undefined');
      }
    } catch (error) {
      this.tableError = {
        isActive: true,
        message: 'Não foi possível carregar os dados. Recarregue a página ou entre em contato com o administrador.',
      };
    } finally {
      this.tableLoading = false;
    }
  }

}
