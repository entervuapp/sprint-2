import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import ObjectUtil from "../../utils/object-utils";

@Component({
  selector: "app-time-input-field",
  templateUrl: "./time-input-field.component.html",
  styleUrls: ["./time-input-field.component.css"],
})
export class TimeInputFieldComponent implements OnInit, OnChanges {
  timeInputControl: FormControl;

  @Input() placeholderText: string;
  @Input() fieldSize: string;
  @Input() maxlength: string;
  @Input() isRequired: boolean;
  @Input() isTouched: boolean;
  @Input() resetField: boolean;
  @Input() renderValue: string;
  @Output() onChange = new EventEmitter();
  constructor(private objectUtil: ObjectUtil) {}

  ngOnInit() {
    this.isRequired = this.isRequired || false;
    this.initializeControl();
    this.placeholderText = this.placeholderText || "HH:MM";
    this.fieldSize = this.fieldSize || "5";
    this.maxlength = this.maxlength || "5";
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("isTouched") &&
      changes.isTouched.currentValue
    ) {
      this.isTouched = changes.isTouched.currentValue;
      if (!this.timeInputControl) {
        this.initializeControl();
      }
      this.timeInputControl.markAsTouched({ onlySelf: true });
    }

    if (
      changes &&
      changes.hasOwnProperty("resetField") &&
      changes.resetField.currentValue
    ) {
      this.resetField = changes.resetField.currentValue;
      this.isTouched = false;
      this.timeInputControl.setValue("");
      this.timeInputControl.markAsPristine({ onlySelf: true });
      setTimeout(() => {
        this.timeInputControl.markAsUntouched({ onlySelf: true });
      }, 500);
    }

    if (
      changes &&
      changes.hasOwnProperty("renderValue") &&
      changes.renderValue.currentValue !== changes.renderValue.previousValue
    ) {
      this.renderValue = changes.renderValue.currentValue;
      this.timeInputControl.setValue(changes.renderValue.currentValue);
    }
  }

  private initializeControl = () => {
    if (this.isRequired) {
      this.timeInputControl = new FormControl("", {
        validators: Validators.required,
        updateOn: "blur",
      });
    } else {
      this.timeInputControl = new FormControl("", {
        validators: Validators.required,
        updateOn: "blur",
      });
    }
  };

  public checkForError = (formControl, property) => {
    return this.objectUtil.checkForFormErrors(formControl, property);
  };

  public onBlur = () => {
    let enteredTime = JSON.parse(JSON.stringify(this.timeInputControl.value));
    var timeRegex = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/;
    if (
      enteredTime &&
      enteredTime.length === 4 &&
      enteredTime.indexOf(":") !== -1
    ) {
      if (enteredTime.split(":")[0].length === 1) {
        enteredTime = `0${enteredTime}`;
      } else if (enteredTime.split(":")[1].length === 1) {
        enteredTime = `${enteredTime}0`;
      }
    } else if (enteredTime && enteredTime.length === 4) {
      enteredTime = enteredTime.substr(0, 2) + ":" + enteredTime.substr(2);
    }
    if (timeRegex.exec(enteredTime) === null) {
      console.log("invalid time");
    } else {
      this.timeInputControl.setValue(enteredTime);
      if (this.onChange) {
        this.onChange.emit(this.timeInputControl.value);
      }
    }
  };
}
