import { TestBed } from '@angular/core/testing';
import { EstructuraCreditoService } from './estructura-credito.service';


describe('EstructuraCreditoService', () => {
  let service: EstructuraCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstructuraCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});