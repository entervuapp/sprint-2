import { Component, OnInit } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { ObjectUtil } from "../../utils/object-utils";
import { UserDetailsService } from "../../services/user-details/user-details.service";

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
  public showNotification: boolean;
  public activeModule: string;
  public showSettings: boolean;
  public fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  public SHARED_CONSTANTS;
  public menuList: Menu[];
  public showMobileMenu: boolean;
  public showProfileOptionsForMobile: boolean;
  public profileMenuList;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public localStorageService: LocalStorageService,
    public objectUtil: ObjectUtil,
    public userDetailsService: UserDetailsService
  ) {
    super();
  }

  ngOnInit() {
    this.showProfileOptionsForMobile = false;
    this.showMobileMenu = false;
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    let userDetails = this.userDetailsService.get();
    this.profileMenuList = this.objectUtil.getMenuList(this.userDetails);
    if (
      userDetails &&
      userDetails["user"] &&
      userDetails["user"].roles &&
      userDetails["user"].roles[0] &&
      userDetails["user"].roles[0].name
    ) {
      if (
        this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN ===
        userDetails["user"].roles[0].name
      ) {
        this.menuList = [
          ...this.SHARED_CONSTANTS.MAIN_MENU.ORGANIZATION_MENU_LIST,
        ];
      } else if (
        this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER ===
        userDetails["user"].roles[0].name
      ) {
        this.menuList = [
          ...this.SHARED_CONSTANTS.MAIN_MENU.ORGANIZATION_MENU_LIST,
        ];
      } else if (
        this.SHARED_CONSTANTS.EVU_USER_ROLES.CANDIDATE ===
        userDetails["user"].roles[0].name
      ) {
        this.menuList = [
          ...this.SHARED_CONSTANTS.MAIN_MENU.INDIVIDUAL_MENU_LIST,
        ];
      } else if (
        this.SHARED_CONSTANTS.EVU_USER_ROLES.SUPER_USER ===
        userDetails["user"].roles[0].name
      ) {
        this.menuList = [
          ...this.SHARED_CONSTANTS.MAIN_MENU.SUPER_USER_MENU_LIST,
        ];
      }
    }
    this.highlightModule();
  }

  private highlightModule = (): void => {
    if (this.activatedRoute) {
      let url = this.activatedRoute.snapshot["_routerState"].url;
      let urlFirstPart = url.split("/")[1];
      let urlPart = urlFirstPart.split("?")[0];
      let activeMenu = this.menuList.find(
        (menu) => menu.NAVIGATE_TO === urlPart
      );
      this.activeModule =
        activeMenu && activeMenu.DISPLAY_TEXT ? activeMenu.DISPLAY_TEXT : "";
    }
  };

  public noDisplayOverlay = (): void => {
    this.showNotification = false;
    this.showSettings = false;
  };

  public navigateToScreen = (menu): void => {
    this.objectUtil.showAlert([]);
    if (menu) {
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
          this.activeModule = menu.DISPLAY_TEXT;
          this.navigateTo(menu.NAVIGATE_TO);
          break;
        case "QA":
          this.activeModule = menu.DISPLAY_TEXT;
          this.navigateTo(menu.NAVIGATE_TO);
          break;
        case "ADMIN":
          this.activeModule = menu.DISPLAY_TEXT;
          this.navigateTo(menu.NAVIGATE_TO);
          break;
        default:
          break;
      }
    }
  };

  public onClickOfLogo = (): void => {
    const userRole = this.localStorageService.get(
      this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_ROLE
    );
    switch (userRole) {
      case this.SHARED_CONSTANTS.EVU_USER_ROLES.SUPER_USER:
        this.navigateToScreen(
          this.SHARED_CONSTANTS.MAIN_MENU.SUPER_USER_MENU_LIST[0]
        );
        break;
      case this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_ADMIN:
      case this.SHARED_CONSTANTS.EVU_USER_ROLES.HR_USER:
        this.navigateToScreen(
          this.SHARED_CONSTANTS.MAIN_MENU.ORGANIZATION_MENU_LIST[0]
        );
        break;
      case this.SHARED_CONSTANTS.EVU_USER_ROLES.CANDIDATE:
        this.navigateToScreen(
          this.SHARED_CONSTANTS.MAIN_MENU.INDIVIDUAL_MENU_LIST[0]
        );
        break;
      default:
        break;
    }
  };

  public handleDisplayMobileMenu = (event, showMenu: false): void => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.showMobileMenu = showMenu;
  };

  public handleProfileOptionExpansion = (event): void => {
    event.stopPropagation();
    event.preventDefault();
    this.showProfileOptionsForMobile = !this.showProfileOptionsForMobile;
  };
}
