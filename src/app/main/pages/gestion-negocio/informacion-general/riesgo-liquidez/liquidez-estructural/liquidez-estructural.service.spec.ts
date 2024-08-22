/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LiquidezEstructuralService } from './liquidez-estructural.service';

describe('Service: LiquidezEstructural', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquidezEstructuralService]
    });
  });

  it('should ...', inject([LiquidezEstructuralService], (service: LiquidezEstructuralService) => {
    expect(service).toBeTruthy();
  }));
});
