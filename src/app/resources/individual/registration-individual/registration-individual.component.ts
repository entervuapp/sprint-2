import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { LoginFormService } from "../../../commons/components/login-form/login-form/login-form.service";
import { Subscription } from "rxjs";
import { Alerts } from "../../../commons/typings/typings";

@Component({
  selector: "app-registration-individual",
  templateUrl: "./registration-individual.component.html",
  styleUrls: ["./registration-individual.component.scss"],
})
export class RegistrationIndividualComponent implements OnInit {
  myForm: FormGroup;
  public alerts: Alerts[];
  public FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();

  @Output() onLoginClick = new EventEmitter();
  @Output() onError = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private loginFormService: LoginFormService
  ) {}

  ngOnInit() {
    this.alerts = [];
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
      mobile: new FormControl("", [
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

  public checkForError = (formObj, property): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };

  public onRegister = (): void => {
    if (this.myForm.valid === false) {
      return;
    }
    let requestBody = {
      ...this.myForm.value,
      clientName: "entervu",
      role:
        this.myForm.value.companyCode && this.myForm.value.companyName
          ? "ENTERVU_ROLE_HR_ADMIN"
          : "ENTERVU_ROLE_CANDIDATE",
    };
    delete requestBody.confirmPassword;
    console.log("onRegister can", JSON.stringify(requestBody));
    this._subscriptions.add(
      this.loginFormService.inidivualRegistration(requestBody).subscribe(
        (response) => {
          console.log("success candidate registration");
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
}
