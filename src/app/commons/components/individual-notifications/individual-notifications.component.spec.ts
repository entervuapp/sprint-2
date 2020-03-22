import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualNotificationsComponent } from './individual-notifications.component';

describe('IndividualNotificationsComponent', () => {
  let component: IndividualNotificationsComponent;
  let fixture: ComponentFixture<IndividualNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
