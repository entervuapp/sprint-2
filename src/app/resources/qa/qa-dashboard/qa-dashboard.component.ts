import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";

@Component({
  selector: "app-qa-dashboard",
  templateUrl: "./qa-dashboard.component.html",
  styleUrls: ["./qa-dashboard.component.css"],
})
export class QaDashboardComponent implements OnInit {
  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }
}
