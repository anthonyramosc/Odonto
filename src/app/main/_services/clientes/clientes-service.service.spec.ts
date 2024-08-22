/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientesServiceService } from './clientes-service.service';

describe('Service: ClientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientesServiceService]
    });
  });

  it('should ...', inject([ClientesServiceService], (service: ClientesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
