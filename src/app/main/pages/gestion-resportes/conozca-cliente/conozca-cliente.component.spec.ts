import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConozcaClienteComponent } from './conozca-cliente.component';

describe('ConozcaClienteComponent', () => {
  let component: ConozcaClienteComponent;
  let fixture: ComponentFixture<ConozcaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConozcaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConozcaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
