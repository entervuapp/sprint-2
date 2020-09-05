import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditProfileHrComponent } from "./edit-profile-hr.component";

describe("EditProfileHrComponent", () => {
  let component: EditProfileHrComponent;
  let fixture: ComponentFixture<EditProfileHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileHrComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
