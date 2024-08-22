/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistroInversionesService } from './registro-inversiones.service';

describe('Service: RegistroInversiones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroInversionesService]
    });
  });

  it('should ...', inject([RegistroInversionesService], (service: RegistroInversionesService) => {
    expect(service).toBeTruthy();
  }));
});
