import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html",
  styleUrls: ["./error-message.component.scss"],
})
export class ErrorMessageComponent implements OnInit {
  timeRegex;
  @Input() formObject: FormGroup | FormControl;
  @Input() controlName: string;
  @Input() fieldName: string;
  constructor() {}

  ngOnInit() {
    this.controlName = this.controlName || "";
    this.fieldName = this.fieldName || "";
    if (this.fieldName === "Time") {
      this.timeRegex = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/;
    }
  }

  public checkInstance = (formObject, formType) => {
    if (formObject && formType === "formGroup") {
      return formObject instanceof FormGroup;
    } else if (formObject && formType === "formControl") {
      return formObject instanceof FormControl;
    } else {
      return false;
    }
  };
}
