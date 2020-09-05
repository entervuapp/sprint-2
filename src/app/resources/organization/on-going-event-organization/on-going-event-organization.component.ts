import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SkillWithCount } from "../../../commons/typings/typings";
import { ManageEventsService } from "../../../resources/organization/manage-events/manage-events/manage-events.service";
import { ManageCandidateService } from "../../../resources/organization/manage-candidates/manage-candidates/manage-candidate.service";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";

@Component({
  selector: "app-on-going-event-organization",
  templateUrl: "./on-going-event-organization.component.html",
  styleUrls: ["./on-going-event-organization.component.css"],
})
export class OnGoingEventOrganizationComponent implements OnInit {
  private _subscriptions = new Subscription();
  public eventId: number;
  public selectedSlide: SkillWithCount;
  public eventDetails: object;
  public candidatesList: any[];
  public SHARED_CONSTANTS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService,
    public objectUtil: ObjectUtil
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this._subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.eventId = parseInt(params["id"]);
        if (this.eventId) {
          this.getEventDetails(this.eventId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public onSelectOfCarousel = (slide: SkillWithCount): void => {
    this.selectedSlide = { ...slide };
  };

  private getEventDetails = (eventId): void => {
    if (eventId) {
      this._subscriptions.add(
        this.manageEventsService.findEvent(eventId).subscribe(
          (response) => {
            this.eventDetails = { ...response };
            this.getCandidatesList(this.eventId);
          },
          (errors) => {
            console.log("error", errors);
            if (errors) {
              this.objectUtil.showAlert([
                ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
              ]);
            }
          }
        )
      );
    }
  };

  private getCandidatesList = (eventId): void => {
    this._subscriptions.add(
      this.manageCandidateService.getCandidates().subscribe(
        (response) => {
          let allCandidatesList = [...response];
          this.candidatesList = allCandidatesList.filter(
            (item) => item.eventId === eventId
          );
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };
}
