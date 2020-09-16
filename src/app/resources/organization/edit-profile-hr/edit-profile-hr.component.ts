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
import { EditProfileHrService } from "./edit-profile-hr/edit-profile-hr.service";
import { Subscription } from "rxjs";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";

@Component({
  selector: "app-edit-profile-hr",
  templateUrl: "./edit-profile-hr.component.html",
  styleUrls: ["./edit-profile-hr.component.scss"],
})
export class EditProfileHrComponent extends AppComponent implements OnInit {
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
    private editProfileHrService: EditProfileHrService,
    public localStorageService: LocalStorageService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.displayTextObject = {
      editProfile: "Edit profile",
      update: "Update",
      reset: "Reset",
      firstName: "First name",
      lastName: "Last name",
      officeEmail: "Office email",
      address: "Address",
      mobile: "Mobile",
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
        data && data.user && data.user.imageUrl ? data.user.imageUrl : ""
      ),
      firstName: new FormControl(
        data && data.user && data.user.firstName ? data.user.firstName : "",
        [Validators.required, Validators.minLength(3)]
      ),
      lastName: new FormControl(
        data && data.user && data.user.lastName ? data.user.lastName : ""
      ),
      mobileNumber: new FormControl(
        data && data.user && data.user.mobileNumber
          ? data.user.mobileNumber
          : null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]
      ),
      officeEmail: new FormControl(
        {
          value: data && data.user && data.user.email ? data.user.email : "",
          disabled: true,
        },
        [Validators.required, Validators.email]
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
    let requestBody = { ...this.myForm.value };
    //to be removed
    this._subscriptions.add(
      this.editProfileHrService.updateProfile(requestBody).subscribe(
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
