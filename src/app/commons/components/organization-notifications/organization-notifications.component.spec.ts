import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationNotificationsComponent } from './organization-notifications.component';

describe('OrganizationNotificationsComponent', () => {
  let component: OrganizationNotificationsComponent;
  let fixture: ComponentFixture<OrganizationNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
