import { TestBed } from "@angular/core/testing";

import { EditProfileHrService } from "./edit-profile-hr.service";

describe("EditProfileHrService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EditProfileHrService = TestBed.get(EditProfileHrService);
    expect(service).toBeTruthy();
  });
});
