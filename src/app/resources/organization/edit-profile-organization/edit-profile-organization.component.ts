import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";

@Component({
  selector: "app-edit-profile-organization",
  templateUrl: "./edit-profile-organization.component.html",
  styleUrls: ["./edit-profile-organization.component.scss"]
})
export class EditProfileOrganizationComponent implements OnInit {
  myForm: FormGroup;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;

  constructor(private fb: FormBuilder, private objectUtil: ObjectUtil) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      avatar: new FormControl(""),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl(""),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
      companyName: new FormControl("", [
        Validators.required,
        Validators.min(3)
      ]),
      companyCode: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.min(3)
      ]),
      address: new FormControl("", [Validators.required, Validators.min(10)])
    });
  }

  showLogin = () => {};

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  onAvatarChange = event => {
    if (event && event.image) {
      this.myForm.controls["avatar"].setValue(event.image);
    } else {
      this.myForm.controls.avatar.setValue(null);
    }
  };

  onResumeChange = event => {
    if (event && event.file) {
      this.myForm.controls["resume"].setValue(event.file);
    } else {
      this.myForm.controls.resume.setValue(null);
    }
  };

  onUpdate = () => {
    console.log("on update", this.myForm.value);
  };

  onReset = () => {
    console.log("on reset", this.myForm.value);
  };
}
