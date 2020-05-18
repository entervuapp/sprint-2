import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
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
  skillListControls;
  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.resetField = false;
    this.eventsList = [];
    this.eventsList.push({
      name: "mega",
      eventDate: "2020-05-19",
      eventTime: "12:12",
      skillsList: [{ skillName: "ue", numberOfRounds: "3" }],
    });
    this.displayTextObj = {
      name: "Name",
      eventDate: "Date",
      eventTime: "Time",
    };
    this.formGroupObject = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      eventDate: new FormControl("", [Validators.required]),
      eventTime: new FormControl("", [Validators.required]),
      skillsList: this.fb.array([
        this.fb.group({
          skillName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
          ]),
          numberOfRounds: new FormControl("", [Validators.required]),
        }),
      ]),
    });

    this.skillListControls = this.formGroupObject.controls.skillsList[
      "controls"
    ];
  }

  onSubmit = () => {
    this.eventsList["push"](this.formGroupObject.value);
    console.log(
      "onSubmit of event ",
      JSON.stringify(this.formGroupObject.value)
    );
    console.log("onSubmit of eventsList ", this.eventsList);
  };

  onReset = () => {
    console.log("onReset of contacts ", this.formGroupObject.value);
    this.resetField = true;
    setTimeout(() => {
      this.resetField = false;
    }, 500);
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  addNewSkill = () => {
    const skills = this.formGroupObject.controls.skillsList as FormArray;
    skills.push(
      this.fb.group({
        skillName: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
        ]),
        numberOfRounds: new FormControl("", [Validators.required]),
      })
    );
  };

  removeSkill = (idx) => {
    console.log("skills 1");
    let skills = this.formGroupObject.controls.skillsList as FormArray;
    skills.controls["splice"](idx, 1);
    console.log("skills 2", skills);
    this.cdr.detectChanges();
  };

  public onEdit = (): void => {};

  public onDelete = (): void => {};

  public onTimeChange = (event): void => {
    if (event) {
      this.formGroupObject["controls"]["eventTime"].setValue(event);
    } else {
      this.formGroupObject["controls"]["eventTime"].setValue("");
    }
  };
}
