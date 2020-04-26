import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-dashboard-individual",
  templateUrl: "./dashboard-individual.component.html",
  styleUrls: ["./dashboard-individual.component.scss"],
})
export class DashboardIndividualComponent extends AppComponent
  implements OnInit {
  constructor(public manageHeaderService: ManageHeaderService) {
    super();
  }

  ngOnInit() {
    this.manageHeaderService.updateHeaderVisibility(true);
  }
}
