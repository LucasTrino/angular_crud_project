import { TestBed } from '@angular/core/testing';

import { PersonTableHeadersService } from './person-table-headers.service';

describe('PersonTableHeadersService', () => {
  let service: PersonTableHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonTableHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
