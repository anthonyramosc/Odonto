import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocClinicosComponent } from './doc-clinicos.component';

describe('DocClinicosComponent', () => {
  let component: DocClinicosComponent;
  let fixture: ComponentFixture<DocClinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocClinicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
