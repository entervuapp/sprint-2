import { AppComponent } from "./../../../app.component";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { Subscription } from "rxjs";
import { NewAny } from "../../../commons/typings/typings";
import { ChangePasswordService } from "./change-password/change-password.service";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { UserDetailsService } from "../../services/user-details/user-details.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent extends AppComponent implements OnInit {
  public myForm: FormGroup;
  private _subscriptions = new Subscription();
  public displayTextObject: NewAny;
  public SHARED_CONSTANTS;
  private userDetails: object;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private changePasswordService: ChangePasswordService,
    public localStorageService: LocalStorageService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      changePassword: "Change password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
    };
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.initializeForm();
    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (): void => {
    this.myForm = this.fb.group({
      currentPassword: new FormControl("", {
        validators: Validators.required,
        updateOn: "blur",
      }),
      newPassword: new FormControl("", {
        validators: Validators.required,
        updateOn: "blur",
      }),
      confirmNewPassword: new FormControl("", {
        validators: Validators.required,
        updateOn: "blur",
      }),
    });
  };

  public checkForError = (formObj: FormGroup, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onUpdate = (): void => {
    let requestBody = {
      ...this.myForm.value,
      email:
        this.userDetails &&
        this.userDetails["user"] &&
        this.userDetails["user"]["email"]
          ? this.userDetails["user"]["email"]
          : "",
    };
    delete requestBody.confirmNewPassword;

    this._subscriptions.add(
      this.changePasswordService.updatePassword(requestBody).subscribe(
        (response) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.onReset();
        },
        (errors) => {
          if (errors) {
            console.log(errors);
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
}
