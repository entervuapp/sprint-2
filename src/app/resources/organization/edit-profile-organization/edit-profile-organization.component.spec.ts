import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileOrganizationComponent } from './edit-profile-organization.component';

describe('EditProfileOrganizationComponent', () => {
  let component: EditProfileOrganizationComponent;
  let fixture: ComponentFixture<EditProfileOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
