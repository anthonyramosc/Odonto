import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologiaComponent } from './radiologia.component';

describe('RadiologiaComponent', () => {
  let component: RadiologiaComponent;
  let fixture: ComponentFixture<RadiologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
