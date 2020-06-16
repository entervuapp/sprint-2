import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGoingEventOrganizationComponent } from './on-going-event-organization.component';

describe('OnGoingEventOrganizationComponent', () => {
  let component: OnGoingEventOrganizationComponent;
  let fixture: ComponentFixture<OnGoingEventOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnGoingEventOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGoingEventOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
