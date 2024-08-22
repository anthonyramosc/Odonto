/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstructuraCostosGastosService } from './estructura-costos-gastos.service';

describe('Service: EstructuraCostosGastos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstructuraCostosGastosService]
    });
  });

  it('should ...', inject([EstructuraCostosGastosService], (service: EstructuraCostosGastosService) => {
    expect(service).toBeTruthy();
  }));
});
