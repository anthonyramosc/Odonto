import { TestBed } from '@angular/core/testing';

import { MyIPServiceService } from './my-ipservice.service';

describe('MyIPServiceService', () => {
  let service: MyIPServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyIPServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
