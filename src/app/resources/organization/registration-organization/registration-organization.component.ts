import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { LoginFormService } from "../../../commons/components/login-form/login-form/login-form.service";
import { ROUTE_URL_PATH_CONSTANTS } from "../../../commons/constants/route-url-path.constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration-organization",
  templateUrl: "./registration-organization.component.html",
  styleUrls: ["./registration-organization.component.scss"],
})
export class RegistrationOrganizationComponent extends AppComponent
  implements OnInit {
  myForm: FormGroup;
  ROUTE_URL_PATH_CONSTANTS;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;

  @Output() onLoginClick = new EventEmitter();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private loginFormService: LoginFormService
  ) {
    super();
  }

  ngOnInit() {
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.myForm = this.fb.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(""),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
      companyCode: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      companyName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  }

  showLogin = () => {
    if (this.onLoginClick) {
      this.onLoginClick.emit();
    }
  };

  onRegister = () => {
    console.log("onRegister", this.myForm.value);
    let requestBody = {
      name: this.myForm.value.firstName,
      email: this.myForm.value.officeEmail,
      password: this.myForm.value.password,
    };

    this.loginFormService.singUp(requestBody).subscribe(
      (response) => {
        console.log("signup success", response);
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.organizationDashboard
        );
      },
      (errors) => {
        console.log("singup error", errors);
      }
    );
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }
}
