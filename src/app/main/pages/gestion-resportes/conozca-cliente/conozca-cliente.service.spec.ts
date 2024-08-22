import { TestBed } from '@angular/core/testing';

import { ConozcaClienteService } from './conozca-cliente.service';

describe('ConozcaClienteService', () => {
  let service: ConozcaClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConozcaClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
