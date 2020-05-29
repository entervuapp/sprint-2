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
import { ManageEventsService } from "./manage-events/manage-events.service";
import { Alerts } from "../../../commons/typings/typings";

@Component({
  selector: "app-manage-events",
  templateUrl: "./manage-events.component.html",
  styleUrls: ["./manage-events.component.scss"],
})
export class ManageEventsComponent implements OnInit {
  resetField: boolean;
  alerts: Alerts[];
  eventsList: any[];
  formGroupObject: FormGroup;
  public displayTextObj: {};
  skillsList: any[];

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private cdr: ChangeDetectorRef,
    private manageEventsService: ManageEventsService
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
    this.getEventsList();
  }

  private initializeForm = (formData?) => {
    this.skillsList = [];
    if (formData) {
      this.formGroupObject = this.fb.group({
        id: new FormControl(formData && formData.id ? formData.id : null),
        createdBy: new FormControl(
          formData && formData.createdBy ? formData.createdBy : ""
        ),
        creationDate: new FormControl(
          formData && formData.creationDate ? formData.creationDate : ""
        ),
        name: new FormControl(formData && formData.name ? formData.name : "", [
          Validators.required,
          Validators.minLength(3),
        ]),
        eventDate: new FormControl(
          formData && formData.eventDate ? formData.eventDate : "",
          [Validators.required]
        ),
        eventTime: new FormControl(
          formData && formData.eventTime ? formData.eventTime : "",
          [Validators.required]
        ),
        skill: new FormControl("", []),
        numberOfRounds: new FormControl("", []),
      });
      this.skillsList =
        formData && formData.skillsList && formData.skillsList.length > 0
          ? formData.skillsList
          : [];
    } else {
      this.formGroupObject = this.fb.group({
        id: new FormControl(null),
        createdBy: new FormControl(""),
        creationDate: new FormControl(""),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        eventDate: new FormControl("", [Validators.required]),
        eventTime: new FormControl("", [Validators.required]),
        skill: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
        ]),
        numberOfRounds: new FormControl("", [Validators.required]),
      });
    }
  };

  onSave = () => {
    this.alerts = [];
    if (
      this.formGroupObject.controls.skill.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      this.addNewSkill();
    }

    let requestBody = {
      id:
        this.formGroupObject &&
        this.formGroupObject.value &&
        this.formGroupObject.value.id
          ? this.formGroupObject.value.id
          : null,
      name: this.formGroupObject.value.name,
      eventDate: this.formGroupObject.value.eventDate,
      creationDate: this.formGroupObject.value.eventDate,
      eventTime: this.formGroupObject.value.eventTime,
      createdBy: "",
      skillsList: [...this.skillsList],
    };
    // this.eventsList["push"](requestBody);
    console.log("onSubmit of eventsList ", this.eventsList);
    if (
      requestBody &&
      requestBody.id !== null &&
      requestBody.id !== undefined
    ) {
      this.updateEvent(requestBody);
    } else {
      this.createEvent(requestBody);
    }
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

  private updateEvent = (requestBody) => {
    this.manageEventsService.updateEvent(requestBody).subscribe(
      (response) => {
        console.log("update successfull");
        this.getEventsList();
        this.alerts = [
          { code: "SUCCESS", systemMessage: "Updated sucessfully" },
        ];
      },
      (errors) => {
        console.log(errors);
      }
    );
  };

  private createEvent = (requestBody) => {
    this.manageEventsService.createEvent(requestBody).subscribe(
      (response) => {
        console.log(response);
        this.getEventsList();
        this.alerts = [
          { code: "SUCCESS", systemMessage: "Event created successfully" },
        ];
      },
      (errors) => {
        console.log(errors);
        if (errors && errors.error && errors.error.messages) {
        }
      }
    );
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
      skillName: this.formGroupObject.controls.skill.value,
      numberOfRounds: this.formGroupObject.controls.numberOfRounds.value,
    };
    this.skillsList.push(eachSkill);
    // this.handleMandatorySkill();
    this.clearSkillFields();
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

  public onEditOfEvent = (element) => {
    this.initializeForm(element);
  };

  public onDeleteOfEvent = (element) => {
    if (element && element.id !== null && element.id !== undefined) {
      this.manageEventsService.deleteEvent(element.id).subscribe(
        (response) => {
          this.getEventsList();
        },
        (errors) => {
          console.log(errors);
        }
      );
    }
  };

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

  private getEventsList = () => {
    this.manageEventsService.getEvents().subscribe(
      (response) => {
        this.eventsList = response;
        console.log("events", this.eventsList);
      },
      (errors) => {
        console.log("errors", errors);
      }
    );
  };
}
