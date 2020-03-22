import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import ObjectUtil from "../../../commons/utils/object-utils";

@Component({
  selector: "app-manage-hr-team",
  templateUrl: "./manage-hr-team.component.html",
  styleUrls: ["./manage-hr-team.component.scss"]
})
export class ManageHrTeamComponent implements OnInit {
  myForm: FormGroup;
  invitationList: any[];
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;

  constructor(private fb: FormBuilder, private objectUtil: ObjectUtil) {}

  ngOnInit() {
    this.invitationList = [];
    this.myForm = this.fb.group({
      id: new FormControl(null),
      officeEmail: new FormControl("", [Validators.required, Validators.email])
    });
  }

  checkForError = (formObj, property) => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  onAdd = () => {
    this.myForm.controls.id.setValue(this.invitationList.length + 1);
    this.invitationList.push({ ...this.myForm.value });
    this.myForm.reset();
  };

  onEdit = invitation => {
    const { id, officeEmail } = invitation;
    this.myForm.controls["officeEmail"].patchValue(officeEmail);
    this.myForm.controls["id"].patchValue(id);
  };

  onDelete = () => {};

  sendInvite = () => {};

  onInvitationCancel = () => {
    this.invitationList.length = 0;
    this.myForm.reset();
  };
}
