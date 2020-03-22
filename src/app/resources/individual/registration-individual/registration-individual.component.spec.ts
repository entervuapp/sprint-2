import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationIndividualComponent } from './registration-individual.component';

describe('RegistrationIndividualComponent', () => {
  let component: RegistrationIndividualComponent;
  let fixture: ComponentFixture<RegistrationIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
