import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarAlertComponent } from './snack-bar-alert.component';

describe('SnackBarAlertComponent', () => {
  let component: SnackBarAlertComponent;
  let fixture: ComponentFixture<SnackBarAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
