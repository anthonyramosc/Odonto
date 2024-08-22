import { TestBed } from '@angular/core/testing';

import { Bce01Service } from './bce01.service';

describe('Bce01Service', () => {
  let service: Bce01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bce01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
