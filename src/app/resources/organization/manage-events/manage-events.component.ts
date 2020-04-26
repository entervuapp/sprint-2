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
    this.eventsList = [];
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
    console.log("onSubmit of contacts ", this.formGroupObject.value);
    console.log("onSubmit of eventsList ", this.eventsList);
  };

  onReset = () => {
    console.log("onReset of contacts ", this.formGroupObject.value);
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

  public onEdit = (event) => {};

  public onDelete = (idx) => {};
}
