import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvenciaComponent } from './solvencia.component';

describe('SolvenciaComponent', () => {
  let component: SolvenciaComponent;
  let fixture: ComponentFixture<SolvenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
