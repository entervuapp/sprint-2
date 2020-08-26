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

@Component({
  selector: "app-edit-profile-individual",
  templateUrl: "./edit-profile-individual.component.html",
  styleUrls: ["./edit-profile-individual.component.scss"],
})
export class EditProfileIndividualComponent implements OnInit {
  public myForm: FormGroup;
  private userData: object;
  private _subscriptions = new Subscription();
  public fileData: File = null;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  public displayTestObject: NewAny;
  public SHARED_CONSTANTS;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    private editProfileIndividualService: EditProfileIndividualService,
    public localStorageService: LocalStorageService,
    public manageHeaderService: ManageHeaderService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTestObject = {
      editProfile: "Edit profile",
      update: "Update",
      reset: "Reset",
      mainSkill: "Main skill",
      firstName: "First name",
      lastName: "Last name",
      male: "Male",
      female: "Female",
      emailId: "Email Id",
      mobile: "Mobile",
      skill: "Skill",
    };
    this.initializeForm(null);
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (data): void => {
    this.myForm = this.fb.group({
      id: new FormControl(data && data.id ? data.id : "", []),
      avatar: new FormControl(data && data.imageUrl ? data.imageUrl : "", []),
      firstName: new FormControl(data && data.firstName ? data.firstName : "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(data && data.lastName ? data.lastName : ""),
      gender: new FormControl(data && data.gender ? data.gender : "male"),
      email: new FormControl(
        { value: data && data.email ? data.email : "", disabled: true },
        [Validators.required, Validators.email]
      ),
      contactNumber: new FormControl(
        data && data.contactNumber ? data.contactNumber : "",
        [Validators.required, Validators.minLength(10)]
      ),
      experience: new FormControl(
        data && data.experience ? data.experience : "",
        [Validators.required]
      ),
      skill: new FormGroup({
        value: new FormControl(
          data && data.skill && data.skill.value ? data.skill.value : "",
          [Validators.required]
        ),
        id: new FormControl(
          data && data.skill && data.skill.id ? data.skill.id : "",
          [Validators.required]
        ),
        description: new FormControl(
          data && data.skill && data.skill.description
            ? data.skill.description
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
      id: 0,
      addressLine1: "string",
      addressLine2: "string",
      district: "string",
      state: "string",
      postalCode: "string",
      country: "string",
    };
    requestBody.candidateId = requestBody.id;
    requestBody.clientName =
      this.userData &&
      this.userData["client"] &&
      this.userData["client"].clientName
        ? this.userData["client"].clientName
        : "";
    requestBody.role =
      this.userData &&
      this.userData["roles"] &&
      this.userData["roles"][0] &&
      this.userData["roles"][0].name
        ? this.userData["roles"][0].name
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

  public onSkillSelect = (skill: ValueDescriptionId): void => {
    this.myForm.controls.skill.patchValue({ ...skill });
  };

  private getUserProfile = (): void => {
    let userDetails = JSON.parse(
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
      )
    );
    this._subscriptions.add(
      this.editProfileIndividualService.getProfile(userDetails.id).subscribe(
        (data) => {
          this.userData = { ...data.response };
          this.initializeForm({ ...data.response });
        },
        (errors) => {
          if (errors) {
            console.log(errors);
          }
        }
      )
    );
  };
}
