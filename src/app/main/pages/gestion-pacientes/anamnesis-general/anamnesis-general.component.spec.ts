import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesisGeneralComponent } from './anamnesis-general.component';

describe('AnamnesisGeneralComponent', () => {
  let component: AnamnesisGeneralComponent;
  let fixture: ComponentFixture<AnamnesisGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnamnesisGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesisGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
