import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHrTeamComponent } from './manage-hr-team.component';

describe('ManageHrTeamComponent', () => {
  let component: ManageHrTeamComponent;
  let fixture: ComponentFixture<ManageHrTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHrTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHrTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
