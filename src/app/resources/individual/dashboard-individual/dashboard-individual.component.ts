import { Subscription } from "rxjs";
import { AppComponent } from "./../../../app.component";
import { NewAny } from "src/app/commons/typings/typings";
import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { ActivatedRoute } from "@angular/router";
import { DashboardIndividualService } from "./dashboard-individual/dashboard-individual.service";
import { DatePipe } from "@angular/common";

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
  public todaysEventList: any[];
  public pastEventsList: any[];
  public upComingEventsList: any[];
  public originalEventsList: any[];
  public userDetails: object;
  private _subscriptions = new Subscription();
  public displayTextObject: object;

  constructor(
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    private activatedRoute: ActivatedRoute,
    private dashboardIndividualService: DashboardIndividualService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit() {
    this.todaysEventList = [];
    this.upComingEventsList = [];
    this.pastEventsList = [];
    this.displayTextObject = {
      todaysInterview: "Today's interview",
      upComingInterviews: "Upcoming interviews",
      pastInterviews: "Past interviews",
    };
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
              this.originalEventsList = [...data.response];
              this.filterEventsAsPerDate();
            } else {
              this.originalEventsList = [];
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

  private filterEventsAsPerDate = (): void => {
    if (this.originalEventsList && this.originalEventsList.length) {
      this.originalEventsList.map((eachEvent) => {
        let eventDate = this.datePipe.transform(
          eachEvent.eventDate,
          "MM/dd/yyyy"
        );
        let todaysDate = this.datePipe.transform(new Date(), "MM/dd/yyyy");
        let eventDateFormat = new Date(eventDate).getTime();
        let todaysDateFormat = new Date(todaysDate).getTime();
        if (eventDateFormat > todaysDateFormat) {
          this.upComingEventsList.push(eachEvent);
        } else if (eventDateFormat < todaysDateFormat) {
          this.pastEventsList.push(eachEvent);
        } else if (eventDateFormat === todaysDateFormat) {
          this.todaysEventList.push(eachEvent);
        }
      });
    } else {
      this.todaysEventList = [];
      this.pastEventsList = [];
      this.upComingEventsList = [];
    }
  };

  // public navigateToScreen = (): void => {};
  // public prepareSkillsForDisplay = (): void => {};
}
