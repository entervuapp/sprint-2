import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { ManageHeaderService } from "./commons/services/manage-header/manage-header.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { ROUTE_URL_PATH_CONSTANTS } from "./commons/constants/route-url-path.constants";
import { AlertService } from "./commons/services/alert/alert.service";
import { Alerts } from "./commons/typings/typings";
import { UserDetailsService } from "./commons/services/user-details/user-details.service";
import { LocalStorageService } from "./commons/services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "./commons/constants/shared.constants";
import { SharedService } from "./commons/rest-services/shared/shared.service";
import { ObjectUtil } from "./commons/utils/object-utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "EnterVu";
  public isHeaderVisible: boolean;
  private alertsList: Alerts[];
  public SHARED_CONSTANTS;

  constructor(
    public manageHeaderService?: ManageHeaderService,
    private cdr?: ChangeDetectorRef,
    public router?: Router,
    public alertService?: AlertService,
    public localStorageService?: LocalStorageService,
    public userDetailsService?: UserDetailsService,
    public sharedService?: SharedService,
    public objectUtil?: ObjectUtil
  ) {
    this.isHeaderVisible = false;
  }

  ngOnInit(): void {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    if (
      this.manageHeaderService &&
      this.manageHeaderService.getHeaderVisibility
    ) {
      this.manageHeaderService.getHeaderVisibility().subscribe((flag) => {
        this.isHeaderVisible = flag;
        this.cdr.detectChanges();
      });
    }
    this.checkForSessionToken();

    //subscribe alerts
    if (this.alertService) {
      this.alertService.get().subscribe((alerts) => {
        if (alerts && alerts.length) {
          this.alertsList = alerts;
        } else {
          this.alertsList = [];
        }
      });
    }
  }

  ngOnDestroy(): void {}

  public navigateTo(screen: string, queryParams?): void {
    switch (screen) {
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGIN:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGIN}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_ORGANIZATION_PROFILE:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_ORGANIZATION_PROFILE}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_HR_PROFILE:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_HR_PROFILE}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_INDIVIDUAL_PROFILE:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_INDIVIDUAL_PROFILE}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_CANDIDATE:
        this.router.navigate(
          [`/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_CANDIDATE}`],
          { queryParams: { id: queryParams.id } }
        );
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_TEAM}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ON_GOING_EVENT_ORGANIZATION:
        this.router.navigate(
          [
            `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ON_GOING_EVENT_ORGANIZATION}`,
          ],
          { queryParams: { id: queryParams.id } }
        );
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_SKILLS:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_SKILLS}`,
        ]);
        break;
      case ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN_ORGANIZATION:
        this.router.navigate([
          `/${ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN_ORGANIZATION}`,
        ]);
        break;
      default:
        break;
    }
  }

  public checkForEmptySearch(formObj: FormGroup): boolean {
    if (formObj && formObj.controls) {
      let isFormEmpty = false;
      let keysList = Object.keys(formObj.controls);
      for (let i = 0; i < keysList.length; i++) {
        const control = formObj.get(keysList[i]);
        if (control instanceof FormControl) {
          if (
            control &&
            control.value &&
            Array.isArray(control.value) &&
            control.value.length === 0
          ) {
            isFormEmpty = true;
          } else if (
            control &&
            (control.value === "" ||
              !control.value ||
              (typeof control.value !== "object" &&
                typeof control.value !== "string" &&
                typeof control.value !== "number" &&
                typeof control.value !== "boolean"))
          ) {
            isFormEmpty = true;
          } else {
            isFormEmpty = false;
            break;
          }
        } else if (control instanceof FormGroup) {
          this.checkForEmptySearch;
        }
      }
      return isFormEmpty;
    }
  }

  public onClose = (idx): void => {
    if (idx + 1) {
      this.alertsList.splice(idx, 1);
    }
  };

  public checkForSessionToken = (): void => {
    if (
      !this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      )
    ) {
      this.navigateTo("");
    } else {
      this.setUserDetails();
    }
  };

  public setUserDetails = (): void => {
    if (
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      )
    ) {
      let type = this.objectUtil.decodeUserType(
        this.localStorageService.get(
          this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
        )
      );
      this.sharedService.getLoggedInUserDetails(type).subscribe(
        (data) => {
          if (data && data["response"]) {
            this.userDetailsService.set(data["response"]);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    } else {
      this.navigateTo("");
    }
  };
}
