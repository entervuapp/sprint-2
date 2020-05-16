import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputFieldComponent } from './time-input-field.component';

describe('TimeInputFieldComponent', () => {
  let component: TimeInputFieldComponent;
  let fixture: ComponentFixture<TimeInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
