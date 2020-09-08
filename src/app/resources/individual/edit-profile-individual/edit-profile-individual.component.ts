import { AppComponent } from "./../../../app.component";
import { Subscription } from "rxjs";
import { NewAny, ValueDescriptionId } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { EditProfileIndividualService } from "./edit-profile-individual/edit-profile-individual.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-profile-individual",
  templateUrl: "./edit-profile-individual.component.html",
  styleUrls: ["./edit-profile-individual.component.scss"],
})
export class EditProfileIndividualComponent
  extends AppComponent
  implements OnInit {
  public myForm: FormGroup;
  private _subscriptions = new Subscription();
  public fileData: File = null;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  public displayTestObject: NewAny;
  public SHARED_CONSTANTS;
  public userDetails: object;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    private editProfileIndividualService: EditProfileIndividualService,
    public localStorageService: LocalStorageService,
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.initializeForm(null);
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTestObject = {
      editProfile: "Edit profile",
      update: "Update",
      reset: "Reset",
      primarySkill: "Primary skill",
      firstName: "First name",
      lastName: "Last name",
      male: "Male",
      female: "Female",
      emailId: "Email Id",
      mobile: "Mobile",
      skill: "Skill",
    };
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }
    this.initializeForm({ ...this.userDetails });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (data): void => {
    this.myForm = this.fb.group({
      id: new FormControl(data && data.id ? data.id : "", []),
      avatar: new FormControl(
        data && data["user"] && data["user"].imageUrl
          ? data["user"].imageUrl
          : "",
        []
      ),
      firstName: new FormControl(
        data && data["user"] && data["user"].firstName
          ? data["user"].firstName
          : "",
        [Validators.required, Validators.minLength(3)]
      ),
      lastName: new FormControl(
        data && data["user"] && data["user"].lastName
          ? data["user"].lastName
          : ""
      ),
      gender: new FormControl(
        data && data["user"] && data["user"].gender
          ? data["user"].gender
          : "male"
      ),
      email: new FormControl(
        {
          value:
            data && data["user"] && data["user"].email
              ? data["user"].email
              : "",
          disabled: true,
        },
        [Validators.required, Validators.email]
      ),
      contactNumber: new FormControl(
        data && data["user"] && data["user"].contactNumber
          ? data["user"].contactNumber
          : "",
        [Validators.required, Validators.minLength(10)]
      ),
      experience: new FormControl(
        data && data.experience ? data.experience : "",
        [Validators.required]
      ),
      primarySkill: new FormGroup({
        value: new FormControl(
          data && data.primarySkill && data.primarySkill.value
            ? data.primarySkill.value
            : "",
          [Validators.required]
        ),
        id: new FormControl(
          data && data.primarySkill && data.primarySkill.id
            ? data.primarySkill.id
            : "",
          [Validators.required]
        ),
        description: new FormControl(
          data && data.primarySkill && data.primarySkill.description
            ? data.primarySkill.description
            : "",
          [Validators.required]
        ),
      }),
      resume: new FormControl(data && data.resume ? data.resume : "", []),
    });
  };

  public checkForError = (formObj, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onAvatarChange = (event): void => {
    if (event && event.image) {
      this.myForm.controls["avatar"].setValue(event.image);
    } else {
      this.myForm.controls.avatar.setValue(null);
    }
  };

  public onResumeChange = (event): void => {
    if (event && event.file) {
      this.myForm.controls["resume"].setValue(event.file);
    } else {
      this.myForm.controls.resume.setValue(null);
    }
  };

  public onUpdate = (): void => {
    let requestBody = {
      ...this.myForm.getRawValue(),
    };
    requestBody["address"] = {
      addressLine1: "string",
      addressLine2: "string",
      district: "string",
      state: "string",
      postalCode: "string",
      country: "string",
    };
    requestBody.candidateId = requestBody.id;
    requestBody.clientName =
      this.userDetails &&
      this.userDetails["user"] &&
      this.userDetails["user"]["client"] &&
      this.userDetails["user"]["client"].clientName
        ? this.userDetails["user"]["client"].clientName
        : "";
    requestBody.role =
      this.userDetails &&
      this.userDetails["user"] &&
      this.userDetails["user"]["roles"] &&
      this.userDetails["user"]["roles"][0] &&
      this.userDetails["user"]["roles"][0].name
        ? this.userDetails["user"]["roles"][0].name
        : "";
    this._subscriptions.add(
      this.editProfileIndividualService.updateProfile(requestBody).subscribe(
        (data) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          // this.getUserProfile();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  public onReset = (): void => {
    console.log("on reset", this.myForm.value);
  };

  public onSkillSelect = (primarySkill: ValueDescriptionId): void => {
    this.myForm.controls.primarySkill.patchValue({ ...primarySkill });
  };
}
