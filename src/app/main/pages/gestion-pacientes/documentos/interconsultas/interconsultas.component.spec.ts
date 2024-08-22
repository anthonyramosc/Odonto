import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterconsultasComponent } from './interconsultas.component';

describe('InterconsultasComponent', () => {
  let component: InterconsultasComponent;
  let fixture: ComponentFixture<InterconsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterconsultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterconsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
