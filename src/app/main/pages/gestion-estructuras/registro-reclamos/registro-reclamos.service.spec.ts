import { TestBed } from '@angular/core/testing';

import { RegistroReclamosService } from './registro-reclamos.service';

describe('RegistroReclamosService', () => {
  let service: RegistroReclamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroReclamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
