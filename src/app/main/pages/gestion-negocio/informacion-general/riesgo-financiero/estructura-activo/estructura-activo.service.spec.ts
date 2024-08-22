/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstructuraActivoService } from './estructura-activo.service';

describe('Service: EstructuraActivo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstructuraActivoService]
    });
  });

  it('should ...', inject([EstructuraActivoService], (service: EstructuraActivoService) => {
    expect(service).toBeTruthy();
  }));
});
