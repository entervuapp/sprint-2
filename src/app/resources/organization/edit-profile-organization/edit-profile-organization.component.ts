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
import { EditProfileOrganizationService } from "./edit-profile-organization/edit-profile-organization.service";
import { Subscription } from "rxjs";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";

@Component({
  selector: "app-edit-profile-organization",
  templateUrl: "./edit-profile-organization.component.html",
  styleUrls: ["./edit-profile-organization.component.scss"],
})
export class EditProfileOrganizationComponent implements OnInit {
  public myForm: FormGroup;
  private userData: object;
  public SHARED_CONSTANTS;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public displayTextObject: object;

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private editProfileOrganizationService: EditProfileOrganizationService,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.displayTextObject = {
      editProfile: "Edit profile",
      update: "Update",
      reset: "Reset",
      firstName: "First name",
      lastName: "Last name",
      officeEmail: "Office email",
      companyCode: "Company code",
      companyName: "Company name",
      address: "Address",
      mobile: "Mobile",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.initializeForm(null);
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (data): void => {
    this.myForm = this.fb.group({
      avatar: new FormControl(data && data.avatar ? data.avatar : ""),
      firstName: new FormControl(data && data.firstName ? data.firstName : "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(data && data.lastName ? data.lastName : ""),
      id: new FormControl(data && data.id ? data.id : null),
      contactNumber: new FormControl(
        data && data.contactNumber ? data.contactNumber : null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]
      ),
      officeEmail: new FormControl(data && data.email ? data.email : "", [
        Validators.required,
        Validators.email,
      ]),
      companyName: new FormControl(
        data && data.organization && data.organization.companyName
          ? data.organization.companyName
          : "",
        [Validators.required, Validators.min(3)]
      ),
      companyCode: new FormControl(
        {
          value:
            data && data.organization && data.organization.companyCode
              ? data.organization.companyCode
              : "",
          disabled: true,
        },
        [Validators.required, Validators.min(3)]
      ),
      address: new FormControl(data && data.address ? data.address : "", [
        Validators.required,
        Validators.min(10),
      ]),
    });
  };

  public checkForError = (formObj: FormGroup, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onAvatarChange = (event): void => {
    if (event && event.image) {
      this.myForm.controls["avatar"].setValue(event.image);
    } else {
      this.myForm.controls.avatar.setValue(null);
    }
  };

  public onUpdate = (): void => {
    let requestBody = { ...this.myForm.getRawValue() };
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
      this.editProfileOrganizationService.updateProfile(requestBody).subscribe(
        (response) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.getUserProfile();
        },
        (errors) => {
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
    this.myForm.reset();
  };

  private getUserProfile = (): void => {
    let userDetails = JSON.parse(
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
      )
    );
    this._subscriptions.add(
      this.editProfileOrganizationService.getProfile(userDetails.id).subscribe(
        (data) => {
          this.initializeForm({ ...data.response });
          this.userData = { ...data.response };
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
