import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bce01Component } from './bce01.component';

describe('Bce01Component', () => {
  let component: Bce01Component;
  let fixture: ComponentFixture<Bce01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bce01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bce01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
