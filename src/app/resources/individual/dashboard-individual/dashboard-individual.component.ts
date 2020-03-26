import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { from } from "rxjs";

@Component({
  selector: "app-dashboard-individual",
  templateUrl: "./dashboard-individual.component.html",
  styleUrls: ["./dashboard-individual.component.scss"]
})
export class DashboardIndividualComponent implements OnInit {
  constructor(private manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    this.manageHeaderService.updateHeaderVisibility(true);
  }
}
