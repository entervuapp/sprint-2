import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../constants/route-url-path.constants";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent extends AppComponent implements OnInit {
  ROUTE_URL_PATH_CONSTANTS;
  @Output() hideSettingsMenu = new EventEmitter();

  constructor(
    public router: Router,
    private localStorageService: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
  }

  navigateToScreen = (screen) => {
    if (screen) {
      screen === "logout" ? this.localStorageService.clearAll() : "";
      this.navigateTo(screen);
      if (this.hideSettingsMenu) {
        this.hideSettingsMenu.emit();
      }
    }
  };
}
