import { Component, OnInit } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";

interface Menu {
  DISPLAY_TEXT: string;
  NAVIGATE_TO: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent extends AppComponent implements OnInit {
  showNotification: boolean;
  activeModule: string;
  showSettings: boolean;
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  ROUTE_URL_PATH_CONSTANTS;
  SHARED_CONSTANTS;
  public menuList: Menu[];
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    if (
      this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN ===
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
      )
    ) {
      this.menuList = [
        ...this.SHARED_CONSTANTS.MAIN_MENU.ORGANIZATION_MENU_LIST,
      ];
    } else if (
      this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER ===
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
      )
    ) {
      this.menuList = [
        ...this.SHARED_CONSTANTS.MAIN_MENU.ORGANIZATION_MENU_LIST,
      ];
    } else if (
      this.SHARED_CONSTANTS.EVU_USER_ROLES.CANDIDATE ===
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
      )
    ) {
      this.menuList = [...this.SHARED_CONSTANTS.MAIN_MENU.INDIVIDUAL_MENU_LIST];
    } else if (
      this.SHARED_CONSTANTS.EVU_USER_ROLES.SUPER_USER ===
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
      )
    ) {
      this.menuList = [...this.SHARED_CONSTANTS.MAIN_MENU.SUPER_USER_MENU_LIST];
    }
    this.highlightModule();
  }

  private highlightModule = () => {
    if (this.activatedRoute) {
      let url = this.activatedRoute.snapshot["_routerState"].url;
      let urlFirstPart = url.split("/")[1];
      let urlPart = urlFirstPart.split("?")[0];
      let activeMenu = this.menuList.find(
        (menu) => menu.NAVIGATE_TO === urlPart
      );
      this.activeModule = activeMenu.DISPLAY_TEXT;
    }
  };
  noDisplayOverlay() {
    this.showNotification = false;
    this.showSettings = false;
  }

  navigateToScreen = (menu) => {
    switch (menu.DISPLAY_TEXT) {
      case "EVENTS":
        this.activeModule = menu.DISPLAY_TEXT;
        this.navigateTo(menu.NAVIGATE_TO);
        break;
      case "TEAM":
        this.activeModule = menu.DISPLAY_TEXT;
        this.navigateTo(menu.NAVIGATE_TO);
        break;
      case "DASHBOARD":
        this.activeModule = menu;
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD
        );
        break;
      case "QA":
        this.activeModule = menu;
        this.navigateTo(
          this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD
        );
        break;
      case "ADMIN":
        this.activeModule = menu;
        this.navigateTo(this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN);
        break;
    }
  };
}
