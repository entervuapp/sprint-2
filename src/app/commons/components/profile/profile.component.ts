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
  public displayTextObject: object;
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
      menuList: [],
    };
    this.prepareMenuItems();
  }

  private prepareMenuItems = (): void => {
    this.displayTextObject["menuList"] = this.objectUtil.getMenuList(
      this.userDetails
    );
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
