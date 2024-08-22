import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReclamosComponent } from './registro-reclamos.component';

describe('RegistroReclamosComponent', () => {
  let component: RegistroReclamosComponent;
  let fixture: ComponentFixture<RegistroReclamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroReclamosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
