/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { C04Component } from './c04.component';

describe('C04Component', () => {
  let component: C04Component;
  let fixture: ComponentFixture<C04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
