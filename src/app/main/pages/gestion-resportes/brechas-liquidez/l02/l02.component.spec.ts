/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { L02Component } from './l02.component';

describe('L02Component', () => {
  let component: L02Component;
  let fixture: ComponentFixture<L02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
