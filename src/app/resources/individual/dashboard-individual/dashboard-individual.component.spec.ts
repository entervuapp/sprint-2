import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndividualComponent } from './dashboard-individual.component';

describe('DashboardIndividualComponent', () => {
  let component: DashboardIndividualComponent;
  let fixture: ComponentFixture<DashboardIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
