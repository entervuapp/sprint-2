import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { LoginFormService } from "../../components/login-form/login-form/login-form.service";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent extends AppComponent implements OnInit {
  myForm: FormGroup;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  ROUTE_URL_PATH_CONSTANTS;
  @Output() handleSignUpDisplay = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.myForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  handleSignUp = () => {
    if (this.handleSignUpDisplay) {
      this.handleSignUpDisplay.emit();
    }
  };

  onSignIn() {
    let requestBody = {
      email: this.myForm.value.username,
      password: this.myForm.value.password,
    };
    console.log("onSignIn", requestBody);
    this.loginFormService.signIn(requestBody).subscribe(
      (response) => {
        console.log("login success", response);
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
        );
      },
      (errors) => {
        console.log("login error", errors);
      }
    );
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
