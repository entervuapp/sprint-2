import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { Subscription } from "rxjs";
import { Alerts, NewAny } from "../../../commons/typings/typings";
import { ChangePasswordService } from "./change-password/change-password.service";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  public myForm: FormGroup;
  private _subscriptions = new Subscription();
  public alerts: Alerts[];
  public displayTextObject: object;
  public SHARED_CONSTANTS;

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private changePasswordService: ChangePasswordService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      changePassword: "Change password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
    };
    this.alerts = [];
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.initializeForm();
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
      email: JSON.parse(
        this.localStorageService.get(
          this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
        )
      ).email,
    };
    delete requestBody.confirmNewPassword;
    console.log("on password update", JSON.stringify(requestBody));

    this._subscriptions.add(
      this.changePasswordService.updatePassword(requestBody).subscribe(
        (response) => {
          this.alerts = [
            { code: "SUCCESS", systemMessage: "Updated sucessfully" },
          ];
        },
        (errors) => {
          if (errors) {
            console.log(errors);
          }
        }
      )
    );
  };

  public onReset = (): void => {
    this.myForm.reset();
  };
}
