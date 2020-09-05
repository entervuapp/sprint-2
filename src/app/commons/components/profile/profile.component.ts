import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { NewAny } from "../../typings/typings";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { ManageHeaderService } from "../../services/manage-header/manage-header.service";
import { UserDetailsService } from "../../services/user-details/user-details.service";
import { ObjectUtil } from "../../utils/object-utils";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent extends AppComponent implements OnInit {
  public ROUTE_URL_PATH_CONSTANTS;
  public displayTextObject: NewAny;
  public SHARED_CONSTANTS;
  public userDetails: object;

  @Output() hideSettingsMenu = new EventEmitter();

  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    public objectUtil: ObjectUtil
  ) {
    super();
  }

  ngOnInit() {
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.userDetails = this.userDetailsService.get();
    this.displayTextObject = {
      menuList: [
        {
          displayText: "Change password",
          url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD,
        },
        {
          displayText: "Setting",
          url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.SETTINGS,
        },
        {
          displayText: "Logout",
          url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT,
        },
      ],
    };
    this.prepareMenuItems();
  }

  private prepareMenuItems = (): void => {
    let userRole: string =
      this.userDetails &&
      this.userDetails["user"] &&
      this.userDetails["user"].roles &&
      this.userDetails["user"].roles[0] &&
      this.userDetails["user"].roles[0].name;

    if (
      userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN ||
      userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER
    ) {
      if (userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN) {
        let organizationProfileMenu = {
          displayText: "Organization profile",
          url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH
            .EDIT_ORGANIZATION_PROFILE,
        };
        this.displayTextObject["menuList"]["unshift"](organizationProfileMenu);
      }
      let myProfileMenu = {
        displayText: "My profile",
        url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_HR_PROFILE,
      };
      this.displayTextObject["menuList"]["unshift"](myProfileMenu);
    } else if (userRole === this.SHARED_CONSTANTS.EVU_USER_ROLES.CANDIDATE) {
      let myProfileMenu = {
        displayText: "My profile",
        url: this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH
          .EDIT_INDIVIDUAL_PROFILE,
      };
      this.displayTextObject["menuList"]["unshift"](myProfileMenu);
    }
  };

  public navigateToScreen = (screen): void => {
    switch (screen.url) {
      case this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT:
        this.localStorageService.delete(
          this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_SESSION_TOKEN
        );
        this.objectUtil.showAlert([]);
        this.manageHeaderService.updateHeaderVisibility(false);
        this.userDetailsService.set(null);
        break;
      default:
        break;
    }

    this.navigateTo(screen.url);
    if (this.hideSettingsMenu) {
      this.hideSettingsMenu.emit();
    }
  };
}
