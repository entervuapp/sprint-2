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

@Component({
  selector: "app-manage-hr-team",
  templateUrl: "./manage-hr-team.component.html",
  styleUrls: ["./manage-hr-team.component.scss"],
})
export class ManageHrTeamComponent implements OnInit {
  myForm: FormGroup;
  invitationList: any[];
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public teamMembersList: any[];

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private manageHrTeamService: ManageHrTeamService,
    public manageHeaderService: ManageHeaderService
  ) {}

  ngOnInit() {
    this.teamMembersList = [];
    this.invitationList = [];
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
    this.myForm.controls.id.setValue(this.invitationList.length + 1);
    this.invitationList.push({ ...this.myForm.value });
    this.myForm.reset();
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
    this.invitationList.length = 0;
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
