import { NewAny } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";

interface OrganizationNameButton {
  companyName: string;
  companyCode: string;
  active: boolean;
}

@Component({
  selector: "app-dashboard-individual",
  templateUrl: "./dashboard-individual.component.html",
  styleUrls: ["./dashboard-individual.component.scss"],
})
export class DashboardIndividualComponent implements OnInit {
  public organizationList: OrganizationNameButton[];

  constructor(private manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }

    this.organizationList = [
      { companyCode: "TCS", companyName: "TCS", active: true },
      { companyCode: "INFOSYS", companyName: "INFOSYS", active: false },
    ];
  }

  public onOrganizationClick = (organization: OrganizationNameButton): void => {
    this.organizationList.forEach((element) => {
      if (element && element.companyCode === organization.companyCode) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
  };
}
