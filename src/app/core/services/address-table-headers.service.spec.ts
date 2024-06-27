import { TestBed } from '@angular/core/testing';

import { AddressTableHeadersService } from './address-table-headers.service';

describe('AddressTableHeadersService', () => {
  let service: AddressTableHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressTableHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
