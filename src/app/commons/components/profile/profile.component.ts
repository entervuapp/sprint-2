import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { NewAny } from "../../typings/typings";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { ManageHeaderService } from "../../services/manage-header/manage-header.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent extends AppComponent implements OnInit {
  public ROUTE_URL_PATH_CONSTANTS;
  public displayTextObject: NewAny;
  public SHARED_CONSTANTS;
  @Output() hideSettingsMenu = new EventEmitter();

  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    public manageHeaderService: ManageHeaderService
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      myProfile: "My profile",
      changePassword: "Change password",
      settings: "Settings",
      logout: "Logout",
    };
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
  }

  public navigateToScreen = (screen): void => {
    if (screen) {
      screen === "logout"
        ? (this.localStorageService.clearAll(),
          this.manageHeaderService.updateHeaderVisibility(false))
        : "";
      if (screen === "My profile") {
        let userRole = this.localStorageService.get(
          this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
        );
        if (
          userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN ||
          userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER
        ) {
          screen = this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH
            .EDIT_ORGANIZATION_PROFILE;
        } else if (
          userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.CANDIDATE
        ) {
          screen = this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH
            .EDIT_INDIVIDUAL_PROFILE;
        }
      }
      this.navigateTo(screen);
      if (this.hideSettingsMenu) {
        this.hideSettingsMenu.emit();
      }
    }
  };
}
