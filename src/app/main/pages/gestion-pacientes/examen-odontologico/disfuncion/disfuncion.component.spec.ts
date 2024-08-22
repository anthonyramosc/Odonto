import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfuncionComponent } from './disfuncion.component';

describe('DisfuncionComponent', () => {
  let component: DisfuncionComponent;
  let fixture: ComponentFixture<DisfuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisfuncionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
