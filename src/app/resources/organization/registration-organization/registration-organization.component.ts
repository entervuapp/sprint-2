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
import { SharedService } from "../../../commons/rest-services/shared/shared.service";

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
  public displayTextObject: Object;

  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private loginFormService: LoginFormService,
    private localStorageService: LocalStorageService,
    private registrationOrganizationService: RegistrationOrganizationService,
    private sharedService: SharedService
  ) {
    super();
  }

  ngOnInit() {
    this.displayTextObject = {
      signUp: "Sign up",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (): void => {
    this.myForm = this.fb.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(""),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
      clientName: new FormControl("entervu", [Validators.required]),
      organizationRequest: new FormGroup({
        code: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        contactNumber: new FormControl("", []),
        address: new FormGroup({
          addressLine1: new FormControl("", []),
          addressLine2: new FormControl("", []),
          district: new FormControl("", []),
          state: new FormControl("", []),
          postalCode: new FormControl("", []),
          country: new FormControl("", []),
        }),
      }),
      mobileNumber: new FormControl("", []),
      gender: new FormControl("", []),
      imageUrl: new FormControl("", []),
    });
  };

  public showLogin = (): void => {
    if (this.onLoginClick) {
      this.onLoginClick.emit();
    }
  };

  public onRegister = (): void => {
    this.objectUtil.showAlert([]);
    let requestBody = {
      ...this.myForm.value,
      role:
        this.myForm.value &&
        this.myForm.value.companyCode &&
        this.myForm.value.companyName
          ? "ENTERVU_ROLE_HR_ADMIN"
          : "ENTERVU_ROLE_CANDIDATE",
    };
    delete requestBody.confirmPassword;
    console.log("on register", JSON.stringify(requestBody));

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

  private doLogin = (requestBody): void => {
    let requestBodyfroLogin = {
      email: requestBody.officeEmail,
      password: requestBody.password,
    };
    this._subscriptions.add(
      this.loginFormService.signIn(requestBodyfroLogin).subscribe(
        (response) => {
          console.log("login success", response);
          this.prepareLocalStorages(response, "token");
          this.getUserDetails();
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
  private prepareLocalStorages = (response, type): void => {
    if (type === "role") {
      this.localStorageService.set(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE,
        response.roles[0]
      );
    }
    if (type === "token") {
      this.localStorageService.set(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN,
        response.accessToken
      );
    }
    // this.localStorageService.set(
    //   this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_DETAILS,
    //   JSON.stringify({
    //     firstName: response && response.firstName ? response.firstName : "",
    //     lastName: response && response.lastName ? response.lastName : "",
    //     email: response && response.email ? response.email : "",
    //     id: response && response.id ? response.id : "",
    //     companyName:
    //       response && response.companyName ? response.companyName : "",
    //     companyCode:
    //       response && response.companyCode ? response.companyCode : "",
    //   })
    // );
  };

  private sendEmailForVerification = (): void => {};

  private handleNavigation = (): void => {
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

  private getUserDetails = (): void => {
    this.sharedService.getLoggedInUserDetails().subscribe(
      (response) => {
        console.log(response);
        this.prepareLocalStorages(response, "role");
        this.handleNavigation();
      },
      (errors) => {
        console.log(errors);
      }
    );
  };
}
