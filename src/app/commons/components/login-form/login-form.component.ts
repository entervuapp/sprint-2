import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  myForm: FormGroup;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  @Output() handleSignUpDisplay = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  handleSignUp = () => {
    if (this.handleSignUpDisplay) {
      this.handleSignUpDisplay.emit();
    }
  };

  onSignUp() {
    console.log("on signUp", this.myForm.value);
  }

  checkForError(formObj, property) {
    if (
      (formObj.controls[property].hasError("required") &&
        formObj.controls[property].touched) ||
      formObj.controls[property].hasError("minlength")
    ) {
      return true;
    }
    return false;
  }
}
