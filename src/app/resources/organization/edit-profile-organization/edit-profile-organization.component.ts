import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { EditProfileOrganizationService } from "./edit-profile-organization/edit-profile-organization.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-profile-organization",
  templateUrl: "./edit-profile-organization.component.html",
  styleUrls: ["./edit-profile-organization.component.scss"],
})
export class EditProfileOrganizationComponent implements OnInit {
  myForm: FormGroup;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private editProfileOrganizationService: EditProfileOrganizationService
  ) {}

  ngOnInit() {
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.initializeForm(null);
    this.getUserProfile();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (data) => {
    this.myForm = this.fb.group({
      avatar: new FormControl(data && data.avatar ? data.avatar : ""),
      firstName: new FormControl(data && data.firstName ? data.firstName : "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(data && data.lastName ? data.lastName : ""),
      id: new FormControl(data && data.id ? data.id : null),
      officeEmail: new FormControl(
        data && data.officeEmail ? data.officeEmail : "",
        [Validators.required, Validators.email]
      ),
      companyName: new FormControl(
        data && data.companyName ? data.companyName : "",
        [Validators.required, Validators.min(3)]
      ),
      companyCode: new FormControl(
        {
          value: data && data.companyCode ? data.companyCode : "",
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

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  onAvatarChange = (event) => {
    if (event && event.image) {
      this.myForm.controls["avatar"].setValue(event.image);
    } else {
      this.myForm.controls.avatar.setValue(null);
    }
  };

  onResumeChange = (event) => {
    if (event && event.file) {
      this.myForm.controls["resume"].setValue(event.file);
    } else {
      this.myForm.controls.resume.setValue(null);
    }
  };

  onUpdate = () => {
    console.log("on update", this.myForm.getRawValue());
    let requestBody = { ...this.myForm.getRawValue() };
    this.editProfileOrganizationService.updateProfile(requestBody).subscribe(
      (response) => {
        console.log(response);
        this.getUserProfile();
      },
      (errors) => {
        if (errors) {
          console.log(errors);
        }
      }
    );
  };

  onReset = () => {
    console.log("on reset", this.myForm.value);
  };

  private getUserProfile = () => {
    this._subscriptions.add(
      this.editProfileOrganizationService.getProfile(1).subscribe(
        (response) => {
          this.initializeForm({ ...response });
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
