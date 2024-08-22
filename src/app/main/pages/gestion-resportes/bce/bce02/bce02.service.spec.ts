import { TestBed } from '@angular/core/testing';

import { Bce02Service } from './bce02.service';

describe('Bce02Service', () => {
  let service: Bce02Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bce02Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
