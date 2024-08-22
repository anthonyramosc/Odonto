import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenOdontologicoComponent } from './examen-odontologico.component';

describe('ExamenOdontologicoComponent', () => {
  let component: ExamenOdontologicoComponent;
  let fixture: ComponentFixture<ExamenOdontologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenOdontologicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenOdontologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
