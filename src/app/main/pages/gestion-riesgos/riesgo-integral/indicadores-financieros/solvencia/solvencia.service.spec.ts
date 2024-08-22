import { TestBed } from '@angular/core/testing';

import { SolvenciaService } from './solvencia.service';

describe('SolvenciaService', () => {
  let service: SolvenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolvenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
