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
import { Subscription } from "rxjs";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { ObjectUtil } from "../../utils/object-utils";
import { NewAny } from "../../typings/typings";
import { SharedService } from "../../rest-services/shared/shared.service";
import { UserDetailsService } from "../../services/user-details/user-details.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent extends AppComponent implements OnInit {
  public myForm: FormGroup;
  public displayTextObject: NewAny;
  public SHARED_CONSTANTS;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  public ROUTE_URL_PATH_CONSTANTS;
  private _subscriptions = new Subscription();
  @Output() handleSignUpDisplay = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormService,
    public router: Router,
    public localStorageService: LocalStorageService,
    private objectUtil: ObjectUtil,
    public sharedService: SharedService,
    public userDetailsService: UserDetailsService
  ) {
    super();
  }

  ngOnInit() {
    this.displayTextObject = {
      signIn: "Sign in",
      username: "Username",
      password: "Password",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.myForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public handleSignUp = (): void => {
    if (this.handleSignUpDisplay) {
      this.handleSignUpDisplay.emit();
    }
  };

  public onSignIn = (): void => {
    this.objectUtil.showAlert([]);
    let requestBody = {
      email: this.myForm.value.username,
      password: this.myForm.value.password,
    };
    this._subscriptions.add(
      this.loginFormService.signIn(requestBody).subscribe(
        (response) => {
          this.prepareLocalStorages(response);
          this.setUserDetails();
          this.handleNavigation();
        },
        (errors) => {
          if (errors) {
            console.log("login error", errors);
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  public checkForError(formObj, property): boolean {
    if (
      (formObj.controls[property].hasError("required") &&
        formObj.controls[property].touched) ||
      formObj.controls[property].hasError("minlength")
    ) {
      return true;
    }
    return false;
  }

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
    let data = this.userDetailsService.get();
    if (
      data &&
      data["user"] &&
      data["user"].roles &&
      data["user"].roles.length
    ) {
      if (
        data["user"].roles[0].name ===
          this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN ||
        data["user"].roles[0].name ===
          this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_USER
      ) {
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
        );
      } else if (
        data["user"].roles[0].name ===
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
}
