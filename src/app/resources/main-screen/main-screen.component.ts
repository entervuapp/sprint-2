import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../commons/services/manage-header/manage-header.service";
import { LocalStorageService } from "../../commons/services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../commons/constants/shared.constants";

@Component({
  selector: "app-main-screen",
  templateUrl: "./main-screen.component.html",
  styleUrls: ["./main-screen.component.scss"],
})
export class MainScreenComponent implements OnInit {
  public activated: string;
  public handleFormsDisplay: object;
  public displayTextObject: object;
  public SHARED_CONSTANTS;

  constructor(
    public manageHeaderService: ManageHeaderService,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      whatWeAre: "What we are",
      contactUs: "Contact us",
    };
    this.activated = "whatWeAre";
    this.handleFormsDisplay = {
      organizationRegistration: false,
      individualRegistration: false,
      login: false,
      organization: false,
      individual: false,
    };
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(false);
    }
    this.deletePreviousLocalStorage();
  }

  public handleAboutUsAndContactUs = (event): void => {
    this.activated = event.target.id;
  };

  public handleViewOnSlide = (event): void => {
    if (event && event.buttonName === "organizationButton") {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: false,
        login: true,
        organization: true,
        individual: false,
      };
    } else {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: false,
        login: true,
        organization: false,
        individual: true,
      };
    }
  };
  1;

  public handleSignUpDisplay = (): void => {
    if (this.handleFormsDisplay && this.handleFormsDisplay["organization"]) {
      this.handleFormsDisplay = {
        organizationRegistration: true,
        individualRegistration: false,
        login: false,
        organization: true,
        individual: false,
      };
    } else {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: true,
        login: false,
        organization: false,
        individual: true,
      };
    }
  };

  public showLoginScreen = (): void => {
    this.handleActiveAndInactive("login");
  };

  private handleActiveAndInactive = (section: string): void => {
    for (let key in this.handleFormsDisplay) {
      if (key === section) {
        this.handleFormsDisplay[key] = true;
      } else {
        this.handleFormsDisplay[key] = false;
      }
    }
  };

  private deletePreviousLocalStorage = (): void => {
    if (
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      )
    ) {
      this.localStorageService.delete(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      );
    }
  };
}
