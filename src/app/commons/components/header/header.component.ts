import { Component, OnInit } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
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
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    if (this.activatedRoute) {
      let url = this.activatedRoute.snapshot["_routerState"].url;
      this.activeModule = url.split("/")[1];
    } else {
      this.activeModule = this.ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.organizationDashboard;
    }
  }

  noDisplayOverlay() {
    this.showNotification = false;
    this.showSettings = false;
  }

  navigateToScreen = (screen) => {
    if (screen) {
      this.activeModule = screen;
      this.navigateTo(screen);
    }
  };
}
