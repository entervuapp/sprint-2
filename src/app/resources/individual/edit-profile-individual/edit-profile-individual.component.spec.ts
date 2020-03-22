import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileIndividualComponent } from './edit-profile-individual.component';

describe('EditProfileIndividualComponent', () => {
  let component: EditProfileIndividualComponent;
  let fixture: ComponentFixture<EditProfileIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
