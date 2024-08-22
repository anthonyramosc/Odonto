import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bce02Component } from './bce02.component';

describe('Bce02Component', () => {
  let component: Bce02Component;
  let fixture: ComponentFixture<Bce02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bce02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bce02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
