import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import ObjectUtil from "../../../commons/utils/object-utils";
import { ManageHrTeamService } from "./manage-hr-team/manage-hr-team.service";
import { Subscription } from "rxjs";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { RegistrationOrganizationService } from "../registration-organization/registration-organization/registration-organization.service";

@Component({
  selector: "app-manage-hr-team",
  templateUrl: "./manage-hr-team.component.html",
  styleUrls: ["./manage-hr-team.component.scss"],
})
export class ManageHrTeamComponent implements OnInit {
  myForm: FormGroup;
  public SHARED_CONSTANTS;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public teamMembersList: any[];

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private manageHrTeamService: ManageHrTeamService,
    public manageHeaderService: ManageHeaderService,
    private localStorageService: LocalStorageService,
    private registrationOrganizationService: RegistrationOrganizationService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.teamMembersList = [];
    this.myForm = this.fb.group({
      id: new FormControl(null),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
    });
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.getTeamMembers();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  checkForError = (formObj, property) => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  onAdd = () => {
    let requestBody = {
      ...this.myForm.value,
      role: this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER,
      companyCode: JSON.parse(
        this.localStorageService.get(
          this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
        )
      ).companyCode,
      companyName: JSON.parse(
        this.localStorageService.get(
          this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
        )
      ).companyName,
      clientName: "entervu",
    };

    this._subscriptions.add(
      this.registrationOrganizationService
        .organizationSignUp(requestBody)
        .subscribe(
          (data) => {
            this.objectUtil.showAlert(data);
            this.getTeamMembers();
          },
          (errors) => {
            if (errors) {
              this.objectUtil.showAlert(errors);
            }
          }
        )
    );
  };

  onEdit = (invitation) => {
    const { id, officeEmail } = invitation;
    this.myForm.controls["officeEmail"].patchValue(officeEmail);
    this.myForm.controls["id"].patchValue(id);
  };

  onDeleteOfTeamMember = (member) => {
    if (member && member.id) {
      this._subscriptions.add(
        this.manageHrTeamService.deleteTeamMember(member.id).subscribe(
          (response) => {
            this.getTeamMembers();
          },
          (errors) => {
            if (errors) {
              console.log(errors);
            }
          }
        )
      );
    }
  };

  sendInvite = () => {};

  onInvitationCancel = () => {
    this.myForm.reset();
  };

  private getTeamMembers = () => {
    this._subscriptions.add(
      this.manageHrTeamService.getTeamMembers().subscribe(
        (response) => {
          let teams = [...response];
          this.teamMembersList = teams.filter(
            (member) => member.organization === "PK Global"
          );
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
