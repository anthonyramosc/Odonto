import { TestBed } from '@angular/core/testing';
import { EstructuraBalanceService } from './estructura-balance.service';


describe('EstructuraBalanceService', () => {
  let service: EstructuraBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstructuraBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});