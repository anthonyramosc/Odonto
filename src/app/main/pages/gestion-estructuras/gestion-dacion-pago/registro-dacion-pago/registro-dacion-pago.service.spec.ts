/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistroDacionPagoService } from './registro-dacion-pago.service';

describe('Service: RegistroDacionPago', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroDacionPagoService]
    });
  });

  it('should ...', inject([RegistroDacionPagoService], (service: RegistroDacionPagoService) => {
    expect(service).toBeTruthy();
  }));
});
