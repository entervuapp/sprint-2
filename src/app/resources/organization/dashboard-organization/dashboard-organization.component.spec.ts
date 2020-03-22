import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrganizationComponent } from './dashboard-organization.component';

describe('DashboardOrganizationComponent', () => {
  let component: DashboardOrganizationComponent;
  let fixture: ComponentFixture<DashboardOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
