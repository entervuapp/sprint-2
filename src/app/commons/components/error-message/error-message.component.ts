import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html",
  styleUrls: ["./error-message.component.scss"]
})
export class ErrorMessageComponent implements OnInit {
  @Input() formObject: FormGroup;
  @Input() controlName;
  @Input() fieldName: string;
  constructor() {}

  ngOnInit() {
    if (this.controlName === "confirmPassword") {
      console.log(
        "must match",
        this.formObject.controls["confirmPassword"].hasError("mustMatch")
      );
    }
  }
}
