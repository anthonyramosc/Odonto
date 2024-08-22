import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodonciaComponent } from './periodoncia.component';

describe('PeriodonciaComponent', () => {
  let component: PeriodonciaComponent;
  let fixture: ComponentFixture<PeriodonciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodonciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodonciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
