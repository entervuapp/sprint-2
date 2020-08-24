import { AppComponent } from "src/app/app.component";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { Subscription } from "rxjs";
import { RegistrationIndividualService } from "./registration-individual/registration-individual.service";
import { LoginFormService } from "../../../commons/components/login-form/login-form/login-form.service";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { ROUTE_URL_PATH_CONSTANTS } from "../../../commons/constants/route-url-path.constants";
import { Router } from "@angular/router";
import { SharedService } from "../../../commons/rest-services/shared/shared.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { typeofExpr } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-registration-individual",
  templateUrl: "./registration-individual.component.html",
  styleUrls: ["./registration-individual.component.scss"],
})
export class RegistrationIndividualComponent extends AppComponent
  implements OnInit {
  public myForm: FormGroup;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public SHARED_CONSTANTS;
  private ROUTE_URL_PATH_CONSTANTS;
  public displayTextObject: object;
  private role: string;

  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private registrationIndividualService: RegistrationIndividualService,
    private loginFormService: LoginFormService,
    public localStorageService: LocalStorageService,
    public router: Router,
    public sharedService: SharedService,
    public userDetailsService: UserDetailsService
  ) {
    super();
  }

  ngOnInit() {
    this.role = "";
    this.displayTextObject = {
      signUp: "Sign Up",
      firstName: "First name",
      lastName: "Last name",
      emailId: "Email Id",
      mobileNumber: "Mobile number",
      password: "Password",
      confirmPassword: "Confirm password",
      register: "Register",
      dontHaveAccount: "Don't have an account?",
      loginHere: "Login here!",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.initializeForm();
  }

  public initializeForm = (): void => {
    this.myForm = this.fb.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(""),
      officeEmail: new FormControl("", [Validators.required, Validators.email]),
      contactNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  };

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public showLogin = (): void => {
    if (this.onLoginClick) {
      this.onLoginClick.emit();
    }
  };

  public checkForError = (formObj, property: string): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onRegister = (): void => {
    this.objectUtil.showAlert([]);
    if (this.myForm.valid === false) {
      return;
    }
    let requestBody = {
      ...this.myForm.value,
      clientName: "entervu",
      email: this.myForm.value.officeEmail,
      role:
        this.myForm.value.companyCode && this.myForm.value.companyName
          ? this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN
          : this.SHARED_CONSTANTS["EVU_USER_ROLES"].CANDIDATE,
    };
    delete requestBody.confirmPassword;
    this.role = this.myForm["role"];
    this._subscriptions.add(
      this.registrationIndividualService
        .inidivualRegistration(requestBody)
        .subscribe(
          (response) => {
            this.sendEmailForVerification();
            this.doLogin(requestBody);
          },
          (errors) => {
            if (errors) {
              console.log(errors);
              if (this.onError) {
                this.onError.emit(errors);
              }
            }
          }
        )
    );
  };

  private doLogin = (requestBody): void => {
    let requestBodyfroLogin = {
      email: requestBody.officeEmail,
      password: requestBody.password,
    };
    this._subscriptions.add(
      this.loginFormService.signIn(requestBodyfroLogin).subscribe(
        (response) => {
          this.prepareLocalStorages(response);
          this.getUserData();
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

  private sendEmailForVerification = () => {};

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

  private getUserData = (): void => {
    let userType =
      this.role === this.SHARED_CONSTANTS["EVU_USER_ROLES"].CANDIDATE
        ? "Individual"
        : "Organization";
    this.sharedService.getLoggedInUserDetails(userType).subscribe(
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
