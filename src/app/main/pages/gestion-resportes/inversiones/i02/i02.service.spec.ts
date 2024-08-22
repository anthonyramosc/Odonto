/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { I02Service } from './i02.service';

describe('Service: I01', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I02Service]
    });
  });

  it('should ...', inject([I02Service], (service: I02Service) => {
    expect(service).toBeTruthy();
  }));
});
