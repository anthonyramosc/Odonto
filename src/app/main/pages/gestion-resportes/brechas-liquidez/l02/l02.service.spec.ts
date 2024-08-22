/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { L02Service } from './l02.service';

describe('Service: L02', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [L02Service]
    });
  });

  it('should ...', inject([L02Service], (service: L02Service) => {
    expect(service).toBeTruthy();
  }));
});
