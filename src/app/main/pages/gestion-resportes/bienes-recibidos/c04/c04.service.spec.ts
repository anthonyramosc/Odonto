/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { C04Service } from './c04.service';

describe('Service: C04', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [C04Service]
    });
  });

  it('should ...', inject([C04Service], (service: C04Service) => {
    expect(service).toBeTruthy();
  }));
});
