import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstructuraBalanceComponent } from './estructura-balance.component';

describe('EstructuraBalanceComponent', () => {
  let component: EstructuraBalanceComponent;
  let fixture: ComponentFixture<EstructuraBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});