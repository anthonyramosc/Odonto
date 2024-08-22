/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { I02Component } from './i02.component';

describe('I01Component', () => {
  let component: I02Component;
  let fixture: ComponentFixture<I02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
