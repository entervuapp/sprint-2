import { NewAny, ValueDescriptionId } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";

@Component({
  selector: "app-edit-profile-individual",
  templateUrl: "./edit-profile-individual.component.html",
  styleUrls: ["./edit-profile-individual.component.scss"],
})
export class EditProfileIndividualComponent implements OnInit {
  myForm: FormGroup;
  fileData: File = null;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  public displayTestObject: NewAny;
  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private manageHeaderService: ManageHeaderService
  ) {}

  ngOnInit() {
    this.displayTestObject = {
      editProfile: "Edit profile",
      update: "Update",
      reset: "Reset",
      mainSkill: "Main skill",
      firstName: "First name",
      lastName: "Last name",
      male: "Male",
      female: "Female",
      emailId: "Email Id",
      mobile: "Mobile",
      skill: "Skill",
    };
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.initializeForm();
  }

  private initializeForm = (): void => {
    this.myForm = this.fb.group({
      avatar: new FormControl(""),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(""),
      gender: new FormControl("male"),
      email: new FormControl({ value: "awad@g.com", disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      experience: new FormControl("", [Validators.required]),
      skill: new FormGroup({
        value: new FormControl("", [Validators.required]),
        id: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
      }),
      resume: new FormControl("", []),
    });
  };

  public checkForError = (formObj, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onAvatarChange = (event): void => {
    if (event && event.image) {
      this.myForm.controls["avatar"].setValue(event.image);
    } else {
      this.myForm.controls.avatar.setValue(null);
    }
  };

  public onResumeChange = (event): void => {
    if (event && event.file) {
      this.myForm.controls["resume"].setValue(event.file);
    } else {
      this.myForm.controls.resume.setValue(null);
    }
  };

  public onUpdate = (): void => {
    console.log("on update", this.myForm.value);
  };

  public onReset = (): void => {
    console.log("on reset", this.myForm.value);
  };

  public onSkillSelect = (skill: ValueDescriptionId): void => {
    this.myForm.controls.skill.patchValue({ ...skill });
  };
}
