import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirugiaOrtognaticaComponent } from './cirugia-ortognatica.component';

describe('CirugiaOrtognaticaComponent', () => {
  let component: CirugiaOrtognaticaComponent;
  let fixture: ComponentFixture<CirugiaOrtognaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirugiaOrtognaticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirugiaOrtognaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
