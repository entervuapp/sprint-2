import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { from } from "rxjs";

@Component({
  selector: "app-dashboard-individual",
  templateUrl: "./dashboard-individual.component.html",
  styleUrls: ["./dashboard-individual.component.scss"],
})
export class DashboardIndividualComponent implements OnInit {
  public organizationList: string[];

  constructor(private manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }

    this.organizationList = ["TCS", "Infosys"];
  }
}
