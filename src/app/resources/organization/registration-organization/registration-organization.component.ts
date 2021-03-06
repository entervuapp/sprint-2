import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
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
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";

@Component({
  selector: "app-registration-organization",
  templateUrl: "./registration-organization.component.html",
  styleUrls: ["./registration-organization.component.scss"],
})
export class RegistrationOrganizationComponent
  extends AppComponent
  implements OnInit {
  myForm: FormGroup;
  public SHARED_CONSTANTS;
  ROUTE_URL_PATH_CONSTANTS;
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public displayTextObject: Object;
  private role: string;

  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    private loginFormService: LoginFormService,
    public localStorageService: LocalStorageService,
    private registrationOrganizationService: RegistrationOrganizationService,
    public sharedService: SharedService,
    public userDetailsService: UserDetailsService
  ) {
    super();
  }

  ngOnInit() {
    this.role = "";
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
      firstName: new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: "blur",
      }),
      lastName: new FormControl(""),
      password: new FormControl("", {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: "blur",
      }),
      confirmPassword: new FormControl("", {
        validators: [Validators.required],
        updateOn: "blur",
      }),
      officeEmail: new FormControl("", {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      }),
      clientName: new FormControl("entervu", [Validators.required]),
      organizationRequest: new FormGroup({
        code: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: "blur",
        }),
        name: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: "blur",
        }),
        contactNumber: new FormControl("", {
          validators: [],
          updateOn: "blur",
        }),
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
      mobileNumber: "1111111111",
      role:
        this.myForm.value &&
        this.myForm.value.companyCode &&
        this.myForm.value.companyName
          ? this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN
          : this.SHARED_CONSTANTS["EVU_USER_ROLES"].CANDIDATE,
    };
    this.role = this.myForm["role"];
    delete requestBody.confirmPassword;

    this._subscriptions.add(
      this.registrationOrganizationService
        .organizationSignUp(requestBody)
        .subscribe(
          (response) => {
            this.sendEmailForVerification();
            this.doLogin(requestBody);
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
    let requestBodyforLogin = {
      email: requestBody.officeEmail,
      password: requestBody.password,
    };
    this._subscriptions.add(
      this.loginFormService.signIn(requestBodyforLogin).subscribe(
        (response) => {
          this.prepareLocalStorages(response);
          this.getUserData(
            this.objectUtil.decodeUserType(response["accessToken"])
          );
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
    if (response && response["accessToken"]) {
      this.localStorageService.set(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN,
        response["accessToken"]
      );
    }
  };

  private sendEmailForVerification = (): void => {};

  private handleNavigation = (): void => {
    let userDetails = this.userDetailsService.get();
    if (
      userDetails &&
      userDetails["user"] &&
      userDetails["user"].roles &&
      userDetails["user"].roles[0] &&
      userDetails["user"].roles[0].name
    ) {
      if (
        userDetails["user"].roles[0].name ===
          this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN ||
        userDetails["user"].roles[0].name ===
          this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_USER
      ) {
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
        );
      } else if (
        userDetails["user"].roles[0].name ===
        this.SHARED_CONSTANTS["EVU_USER_ROLES"].CANDIDATE
      ) {
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD
        );
      } else {
        this.navigateTo(this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN);
      }
    }
  };

  private getUserData = (type): void => {
    this.sharedService.getLoggedInUserDetails(type).subscribe(
      (data) => {
        this.userDetailsService.set(data["response"]);
        this.handleNavigation();
      },
      (errors) => {
        if (errors) {
          console.log("errors", errors);
          this.objectUtil.showAlert(
            this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
          );
        }
      }
    );
  };
}
