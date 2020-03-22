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
  selector: "app-edit-profile-individual",
  templateUrl: "./edit-profile-individual.component.html",
  styleUrls: ["./edit-profile-individual.component.scss"]
})
export class EditProfileIndividualComponent implements OnInit {
  myForm: FormGroup;
  fileData: File = null;
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
      gender: new FormControl("male"),
      email: new FormControl({ value: "awad@g.com", disabled: true }, [
        Validators.required,
        Validators.email
      ]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ]),
      experience: new FormControl("", [Validators.required]),
      skill: new FormControl("", [Validators.required]),
      resume: new FormControl("", [Validators.required])
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
