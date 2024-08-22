/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { I01Service } from './i01.service';

describe('Service: I01', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I01Service]
    });
  });

  it('should ...', inject([I01Service], (service: I01Service) => {
    expect(service).toBeTruthy();
  }));
});
