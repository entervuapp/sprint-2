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
import { Subscription } from "rxjs";
import { Alerts } from "../../../commons/typings/typings";

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
  private _subscriptions = new Subscription();
  public alerts: Alerts[];
  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private loginFormService: LoginFormService
  ) {
    super();
  }

  ngOnInit() {
    this.alerts = [];
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

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  showLogin = () => {
    if (this.onLoginClick) {
      this.onLoginClick.emit();
    }
  };

  onRegister = () => {
    let requestBody = {
      ...this.myForm.value,
      clientName: "entervu",
      role:
        this.myForm.value &&
        this.myForm.value.companyCode &&
        this.myForm.value.companyName
          ? "ENTERVU_ROLE_HR_ADMIN"
          : "ENTERVU_ROLE_CANDIDATE",
    };
    delete requestBody.confirmPassword;
    this._subscriptions.add(
      this.loginFormService.singUp(requestBody).subscribe(
        (response) => {
          console.log("signup success", response);
          this.navigateTo(
            this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
          );
        },
        (errors) => {
          if (errors) {
            console.log("singup error", errors);
            if (this.onError) {
              this.onError.emit(errors);
            }
          }
        }
      )
    );
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }
}
