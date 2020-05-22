import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";

@Component({
  selector: "app-manage-events",
  templateUrl: "./manage-events.component.html",
  styleUrls: ["./manage-events.component.scss"],
})
export class ManageEventsComponent implements OnInit {
  resetField: boolean;
  eventsList: any[];
  formGroupObject: FormGroup;
  public displayTextObj: {};
  skillsList: any[];

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.eventsList = [];
    this.displayTextObj = {
      name: "Name",
      eventDate: "Date",
      eventTime: "Time",
      skill: "Skill",
      numberOfRounds: "Number of rounds",
    };
    this.resetField = false;
    this.initializeForm();
    this.formGroupObject.get("skill").valueChanges.subscribe((val) => {
      if (val || this.skillsList.length === 0) {
        this.formGroupObject.controls.skill.setValidators([
          Validators.required,
          Validators.minLength(2),
        ]);
        this.formGroupObject.controls.numberOfRounds.setValidators([
          Validators.required,
        ]);
      } else {
        this.formGroupObject.controls.skill.setValidators([]);
        this.formGroupObject.controls.numberOfRounds.setValidators([]);
      }
    });
    this.formGroupObject.get("numberOfRounds").valueChanges.subscribe((val) => {
      if (val || this.skillsList.length === 0) {
        this.formGroupObject.controls.skill.setValidators([
          Validators.required,
          Validators.minLength(2),
        ]);
        this.formGroupObject.controls.numberOfRounds.setValidators([
          Validators.required,
        ]);
      } else {
        this.formGroupObject.controls.skill.setValidators([]);
        this.formGroupObject.controls.numberOfRounds.setValidators([]);
      }
    });
  }

  private initializeForm = () => {
    this.skillsList = [];
    this.formGroupObject = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      eventDate: new FormControl("", [Validators.required]),
      eventTime: new FormControl("", [Validators.required]),
      skill: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      numberOfRounds: new FormControl("", [Validators.required]),
    });
  };

  onSubmit = () => {
    if (
      this.formGroupObject.controls.skill.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      this.addNewSkill();
    }
    let requestBody = {
      name: this.formGroupObject.value.name,
      eventDate: this.formGroupObject.value.eventDate,
      eventTime: this.formGroupObject.value.eventTime,
      skillsList: [...this.skillsList],
    };
    this.eventsList["push"](requestBody);
    console.log("onSubmit of eventsList ", this.eventsList);
    this.onReset();
  };

  onReset = () => {
    this.resetField = true;
    this.initializeForm();
    this.formGroupDirective.resetForm();
    setTimeout(() => this.formGroupDirective.resetForm(), 0);
    setTimeout(() => {
      this.resetField = false;
    }, 500);
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onTimeChange = (event): void => {
    if (event) {
      this.formGroupObject["controls"]["eventTime"].setValue(event);
    } else {
      this.formGroupObject["controls"]["eventTime"].setValue("");
    }
  };

  public onChangeOfRounds = (event) => {
    if (event) {
      this.formGroupObject["controls"]["numberOfRounds"].setValue(event);
    } else {
      this.formGroupObject["controls"]["numberOfRounds"].setValue("");
    }
  };

  addNewSkill = () => {
    let eachSkill = {
      skill: this.formGroupObject.controls.skill.value,
      numberOfRounds: this.formGroupObject.controls.numberOfRounds.value,
    };
    this.skillsList.push(eachSkill);
    // this.handleMandatorySkill();
    this.clearSkillFields();
  };

  private handleMandatorySkill = () => {
    if (this.skillsList && this.skillsList.length > 0) {
      this.formGroupObject.controls.skill.setValidators([]);
      this.formGroupObject.controls.numberOfRounds.setValidators([]);
    } else {
      this.formGroupObject.controls.skill.setValidators([Validators.required]);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.required,
      ]);
    }
  };

  private clearSkillFields = () => {
    this.formGroupObject.controls.skill.setValue("");
    this.formGroupObject.controls.skill.markAsUntouched();
    this.formGroupObject.controls.skill.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.setValue("");
    this.formGroupObject.controls.numberOfRounds.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.markAsUntouched();
  };

  public removeSkill = (idx) => {
    this.skillsList.splice(idx, 1);
    console.log("skills 2", this.skillsList);
    // this.cdr.detectChanges();
  };

  public onSkillEdit = (skillObj): void => {
    this.formGroupObject.controls.skill.setValue(skillObj.skill);
    this.formGroupObject.controls.numberOfRounds.setValue(
      skillObj.numberOfRounds
    );
  };

  public onEditOfEvent = (event) => {};
  public onDeleteOfEvent = (idx) => {};

  public validateSkillSubmit = () => {
    if (
      this.formGroupObject.controls.skill.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      return true;
    } else if (
      this.formGroupObject.controls.skill.value === "" &&
      this.formGroupObject.controls.numberOfRounds.value === ""
    ) {
      return false;
    }
  };
}
