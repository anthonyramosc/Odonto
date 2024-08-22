import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndodonciaComponent } from './endodoncia.component';

describe('EndodonciaComponent', () => {
  let component: EndodonciaComponent;
  let fixture: ComponentFixture<EndodonciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndodonciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndodonciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
