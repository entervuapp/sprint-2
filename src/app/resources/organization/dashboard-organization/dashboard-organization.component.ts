import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";

@Component({
  selector: "app-dashboard-organization",
  templateUrl: "./dashboard-organization.component.html",
  styleUrls: ["./dashboard-organization.component.scss"],
})
export class DashboardOrganizationComponent implements OnInit {
  constructor(private manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    this.manageHeaderService.updateHeaderVisibility(true);
  }
}
