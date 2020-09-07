import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import { ManageHrTeamService } from "./manage-hr-team/manage-hr-team.service";
import { Subscription } from "rxjs";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { RegistrationOrganizationService } from "../registration-organization/registration-organization/registration-organization.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPopupComponent } from "../../../commons/components/modals/confirm-popup/confirm-popup.component";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { AppComponent } from "src/app/app.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-manage-hr-team",
  templateUrl: "./manage-hr-team.component.html",
  styleUrls: ["./manage-hr-team.component.scss"],
})
export class ManageHrTeamComponent extends AppComponent implements OnInit {
  public myForm: FormGroup;
  public SHARED_CONSTANTS;
  private _subscriptions = new Subscription();
  public teamMembersList: any[];
  public displayTextObject: object;
  public userDetails: object;
  public userRole: string;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    private manageHrTeamService: ManageHrTeamService,
    public manageHeaderService: ManageHeaderService,
    public localStorageService: LocalStorageService,
    private registrationOrganizationService: RegistrationOrganizationService,
    private matDialog: MatDialog,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.displayTextObject = {
      headerList: [],
      addTeamMember: "Add team member",
      officeEmail: "Office email",
      teamList: "Team list",
      delete: "Delete",
      promote: "Promote",
      demote: "Demote",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.teamMembersList = [];
    this.myForm = this.fb.group({
      id: new FormControl(null),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
    });
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }
    if (
      this.userDetails &&
      this.userDetails["user"] &&
      this.userDetails["user"].roles &&
      this.userDetails["user"].roles[0] &&
      this.userDetails["user"].roles[0].name
    ) {
      this.userRole = this.userDetails["user"].roles[0].name;
    }

    this.displayTextObject["headerList"] =
      this.userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN ||
      this.userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.SUPER_USER
        ? ["Name", "Email", "Mobile", "Promote/Demote", "Actions"]
        : ["Name", "Email", "Mobile"];

    this.getTeamMembers();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public checkForError = (formObj, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onAdd = (): void => {
    let requestBody = {
      ...this.myForm.value,
      mobileNumber: "1111111111",
    };

    this._subscriptions.add(
      this.registrationOrganizationService
        .jrHrRegistration(requestBody)
        .subscribe(
          (data) => {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
            ]);
            this.onReset();
            this.getTeamMembers();
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

  public onEdit = (invitation): void => {
    const { id, officeEmail } = invitation;
    this.myForm.controls["officeEmail"].patchValue(officeEmail);
    this.myForm.controls["id"].patchValue(id);
  };

  public onDeleteOfTeamMember = (member): void => {
    const data = { message: "Are you sure?", title: "Confirm?" };
    const dialogRef = this.matDialog.open(ConfirmPopupComponent, {
      data: data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "ok") {
        if (member && member.id) {
          this._subscriptions.add(
            this.manageHrTeamService.deleteTeamMember(member.id).subscribe(
              (data) => {
                this.objectUtil.showAlert([
                  ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
                ]);
                this.getTeamMembers();
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
        }
      }
    });
  };

  public sendInvite = (): void => {};

  public onReset = (): void => {
    this.myForm.reset();
  };

  private getTeamMembers = (): void => {
    this._subscriptions.add(
      this.manageHrTeamService
        .getTeamMembers(this.userDetails["organization"].companyCode)
        .subscribe(
          (data) => {
            if (data && data["response"] && data["response"].length > 0) {
              this.teamMembersList = [...data.response];
            } else {
              this.teamMembersList = [];
            }
          },
          (errors) => {
            if (errors) {
              console.log(errors);
            }
          }
        )
    );
  };

  public hasCapability = (task): boolean => {
    return this.objectUtil.isAuthorized(task);
  };

  public onPromoteDemote = (event, member): void => {
    console.log(event, member);
  };

  public isSelf = (member): boolean => {
    let self = false;
    if (
      this.userDetails &&
      this.userDetails["user"] &&
      member &&
      member.user &&
      this.userDetails["user"].email === member.user.email
    ) {
      self = true;
    }
    return self;
  };
}
