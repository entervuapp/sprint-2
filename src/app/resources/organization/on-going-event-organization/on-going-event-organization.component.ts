import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Alerts, SkillWithCount } from "../../../commons/typings/typings";

@Component({
  selector: "app-on-going-event-organization",
  templateUrl: "./on-going-event-organization.component.html",
  styleUrls: ["./on-going-event-organization.component.css"],
})
export class OnGoingEventOrganizationComponent implements OnInit {
  private _subscriptions = new Subscription();
  public eventId: number;
  public alerts: Alerts[];
  public selectedSlide: SkillWithCount;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.eventId = parseInt(params["id"]);
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public onSelectOfCarousel = (slide: SkillWithCount): void => {
    this.selectedSlide = { ...slide };
  };
}
