import { Subscription } from "rxjs";
import { AppComponent } from "./../../../app.component";
import { NewAny } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { ActivatedRoute } from "@angular/router";
import { DashboardIndividualService } from "./dashboard-individual/dashboard-individual.service";

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
  private _subscriptions = new Subscription();

  constructor(
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute,
    private dashboardIndividualService: DashboardIndividualService
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

    this.getIndividualEvents();
  }

  private getIndividualEvents = (): void => {
    this._subscriptions.add(
      this.dashboardIndividualService
        .getUserMappedEvents(this.userDetails["id"])
        .subscribe(
          (data) => {
            if (data && data["response"] && data["response"].length) {
              this.eventsList = [...data.response];
            } else {
              this.eventsList = [];
            }
          },
          (errors) => {
            console.log("errors", errors);
            this.objectUtil.showAlert(
              this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
            );
          }
        )
    );
  };

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
