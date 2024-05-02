import { TestBed } from '@angular/core/testing';

import { FormPersonInputsService } from './form-person-inputs.service';

describe('FormPersonInputsService', () => {
  let service: FormPersonInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPersonInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
