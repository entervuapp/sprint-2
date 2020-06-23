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
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { RegistrationOrganizationService } from "../registration-organization/registration-organization/registration-organization.service";

@Component({
  selector: "app-registration-organization",
  templateUrl: "./registration-organization.component.html",
  styleUrls: ["./registration-organization.component.scss"],
})
export class RegistrationOrganizationComponent extends AppComponent
  implements OnInit {
  myForm: FormGroup;
  SHARED_CONSTANTS;
  ROUTE_URL_PATH_CONSTANTS;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private loginFormService: LoginFormService,
    private localStorageService: LocalStorageService,
    private registrationOrganizationService: RegistrationOrganizationService
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
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
      this.registrationOrganizationService
        .organizationSignUp(requestBody)
        .subscribe(
          (response) => {
            console.log("signup organization success", response);
            this.sendEmailForVerification();
            this.doLogin(requestBody);
            // this.navigateTo(
            //   this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
            // );
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

  public checkForError = (formObj, property): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  private doLogin = (requestBody) => {
    let requestBodyfroLogin = {
      email: requestBody.officeEmail,
      password: requestBody.password,
    };
    this._subscriptions.add(
      this.loginFormService.signIn(requestBodyfroLogin).subscribe(
        (response) => {
          console.log("login success", response);
          this.prepareLocalStorages(response);
          this.handleNavigation();
        },
        (errors) => {
          if (errors) {
            console.log("login error", errors);
            if (this.onError) {
              this.onError.emit(errors);
            }
          }
        }
      )
    );
  };
  private prepareLocalStorages = (response): void => {
    this.localStorageService.set(
      this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE,
      response.roles[0]
    );
    this.localStorageService.set(
      this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN,
      response.accessToken
    );
    this.localStorageService.set(
      this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_DETAILS,
      JSON.stringify({
        firstName: response && response.companyCode ? response.companyCode : "",
        lastName: response && response.companyCode ? response.companyCode : "",
        email: response && response.email ? response.email : "",
        companyName: response && response.firstName ? response.firstName : "",
        companyCode: response && response.lastName ? response.lastName : "",
      })
    );
  };

  private sendEmailForVerification = () => {};

  private handleNavigation = () => {
    if (
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE
      ) === this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN ||
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE
      ) === this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_USER
    ) {
      this.navigateTo(
        this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
      );
    } else if (
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE
      ) === this.SHARED_CONSTANTS["EVU_USER_ROLES"].CANDIDATE
    ) {
      this.navigateTo(
        this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD
      );
    } else {
      this.navigateTo(this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN);
    }
  };
}
