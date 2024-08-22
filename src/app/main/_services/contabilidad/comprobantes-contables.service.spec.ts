/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComprobantesContablesService } from './comprobantes-contables.service';

describe('Service: ComprobantesContables', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobantesContablesService]
    });
  });

  it('should ...', inject([ComprobantesContablesService], (service: ComprobantesContablesService) => {
    expect(service).toBeTruthy();
  }));
});
