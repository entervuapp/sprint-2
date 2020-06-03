import { Component, OnInit } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
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
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;

    this.highlightModule();
  }

  private highlightModule = () => {
    if (this.activatedRoute) {
      let url = this.activatedRoute.snapshot["_routerState"].url;
      let urlFirstPart = url.split("/")[1];
      let urlPart = urlFirstPart.split("?")[0];
      let modules = Object.keys(this.ROUTE_URL_PATH_CONSTANTS.MODULE_WISE_URL);
      for (let i = 0; i < modules.length; i++) {
        if (
          this.ROUTE_URL_PATH_CONSTANTS.MODULE_WISE_URL[modules[i]].indexOf(
            urlPart
          ) !== -1
        ) {
          this.activeModule = modules[i];
        }
      }
    }
  };
  noDisplayOverlay() {
    this.showNotification = false;
    this.showSettings = false;
  }

  navigateToScreen = (menu) => {
    switch (menu) {
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
    }
  };
}
