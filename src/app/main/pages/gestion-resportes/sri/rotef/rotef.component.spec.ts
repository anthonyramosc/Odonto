/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RotefComponent } from './rotef.component';

describe('RotefComponent', () => {
  let component: RotefComponent;
  let fixture: ComponentFixture<RotefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
