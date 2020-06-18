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
import { Alerts } from "../../typings/typings";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent extends AppComponent implements OnInit {
  public myForm: FormGroup;
  public SHARED_CONSTANTS: SHARED_CONSTANTS;
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  public ROUTE_URL_PATH_CONSTANTS;
  public alerts: Alerts[];
  private _subscriptions = new Subscription();
  @Output() handleSignUpDisplay = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private loginFormService: LoginFormService,
    public router: Router,
    public localStorageService: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.alerts = [];
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.myForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
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
    this._subscriptions.add(
      this.loginFormService.signIn(requestBody).subscribe(
        (response) => {
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
              firstName: response.companyCode,
              lastName: response.companyCode,
              email: response.email,
              companyName: response.firstName,
              companyCode: response.lastName,
            })
          );
          if (
            this.localStorageService.get(
              this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_USER_ROLE
            ) === this.SHARED_CONSTANTS["EVU_USER_ROLES"].HR_ADMIN
          ) {
            this.navigateTo(
              this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH
                .ORGANIZATION_DASHBOARD
            );
          } else {
            this.navigateTo(
              this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD
            );
          }
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
