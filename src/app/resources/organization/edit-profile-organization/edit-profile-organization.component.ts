import { AppComponent } from "src/app/app.component";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { EditProfileOrganizationService } from "./edit-profile-organization/edit-profile-organization.service";
import { Subscription } from "rxjs";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";

@Component({
  selector: "app-edit-profile-organization",
  templateUrl: "./edit-profile-organization.component.html",
  styleUrls: ["./edit-profile-organization.component.scss"],
})
export class EditProfileOrganizationComponent
  extends AppComponent
  implements OnInit {
  public myForm: FormGroup;
  private userDetails: object;
  public SHARED_CONSTANTS;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public displayTextObject: object;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private editProfileOrganizationService: EditProfileOrganizationService,
    public localStorageService: LocalStorageService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.displayTextObject = {
      organizationDetails: "Organization details",
      update: "Update",
      reset: "Reset",
      firstName: "First name",
      lastName: "Last name",
      organizationEmail: "Organization email",
      companyCode: "Company code",
      companyName: "Company name",
      officeAddress: "Office address",
      contactNumber: "Contact number",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    if (this.manageHeaderService) {
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
      imageUrl: new FormControl(
        data && data.organization && data.organization.imageUrl
          ? data.organization.imageUrl
          : ""
      ),
      contactNumber: new FormControl(
        data && data.organization && data.organization.contactNumber
          ? data.organization.contactNumber
          : null,
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
          updateOn: "blur",
        }
      ),
      companyEmail: new FormControl(
        data && data.organization && data.organization.companyEmail
          ? data.organization.companyEmail
          : "",
        [Validators.required, Validators.email]
      ),
      companyName: new FormControl(
        data && data.organization && data.organization.companyName
          ? data.organization.companyName
          : "",
        {
          validators: [Validators.required, Validators.min(3)],
          updateOn: "blur",
        }
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
      address: new FormControl(
        data &&
        data.organization &&
        data.organization.address &&
        data.organization.address.addressLine1
          ? data.organization.address.addressLine1
          : "",
        {
          validators: [Validators.required, Validators.min(10)],
          updateOn: "blur",
        }
      ),
    });
  };

  public checkForError = (formObj: FormGroup, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onAvatarChange = (event): void => {
    if (event && event.image) {
      this.myForm.controls["imageUrl"].setValue(event.image);
    } else {
      this.myForm.controls.imageUrl.setValue(null);
    }
  };

  public onUpdate = (): void => {
    let requestBody = { ...this.myForm.getRawValue() };
    requestBody["address"] = {
      addressLine1: this.myForm.value.address,
      addressLine2: "string",
      district: "string",
      state: "string",
      postalCode: "string",
      country: "string",
    };
    requestBody["name"] = requestBody["companyName"];
    this._subscriptions.add(
      this.editProfileOrganizationService
        .updateOrganizationProfile(requestBody)
        .subscribe(
          (response) => {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
            ]);
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
    setTimeout(() => {
      this.initializeForm({ ...this.userDetails });
    }, 500);
  };
}
