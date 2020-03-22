import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOrganizationComponent } from './registration-organization.component';

describe('RegistrationOrganizationComponent', () => {
  let component: RegistrationOrganizationComponent;
  let fixture: ComponentFixture<RegistrationOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
