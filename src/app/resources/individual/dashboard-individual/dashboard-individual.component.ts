import { AppComponent } from "./../../../app.component";
import { NewAny } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { ActivatedRoute } from "@angular/router";

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
export class DashboardIndividualComponent
  extends AppComponent
  implements OnInit {
  public organizationList: OrganizationNameButton[];
  public eventsList: any[];
  public userDetails: object;

  constructor(
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }

    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }

    // this.organizationList = [
    //   { companyCode: "TCS", companyName: "TCS", active: true },
    //   { companyCode: "INFOSYS", companyName: "INFOSYS", active: false },
    // ];
  }

  // public onOrganizationClick = (organization: OrganizationNameButton): void => {
  //   this.organizationList.forEach((element) => {
  //     if (element && element.companyCode === organization.companyCode) {
  //       element.active = true;
  //     } else {
  //       element.active = false;
  //     }
  //   });
  // };

  // public navigateToScreen = (): void => {};
  // public prepareSkillsForDisplay = (): void => {};
}
