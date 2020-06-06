import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }
}
