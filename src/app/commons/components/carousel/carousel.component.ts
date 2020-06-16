import {
  Component,
  OnInit,
  ElementRef,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageEventsService } from "../../../resources/organization/manage-events/manage-events/manage-events.service";
import { Subscription } from "rxjs";
import { Alerts, SkillWithCount } from "../../typings/typings";
import { ManageCandidateService } from "../../../resources/organization/manage-candidates/manage-candidates/manage-candidate.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})
export class CarouselComponent implements OnInit, OnChanges {
  fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  slides: SkillWithCount[];
  private _subscriptions = new Subscription();
  public eventDetails: object;
  public alerts: Alerts[];

  @Input() eventId: number;
  @Output() onSelect = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService
  ) {}

  ngOnInit() {
    this.slides = [];
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("eventId") &&
      changes.eventId.currentValue
    ) {
      this.eventId = changes.eventId.currentValue;
      this.getEventDetails(this.eventId);
    }
  }

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow:
      "<div class='nav-btn next-slide'><img src='../../../../assets/images/right-arrow-red.png'></div>",
    prevArrow:
      "<div class='nav-btn prev-slide'><img src='../../../../assets/images/left-arrow-red.png'></div>",
    dots: false,
    infinite: true,
    autoplay: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  addSlide() {
    this.slides.push();
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    // console.log("slick initialized");
  }

  breakpoint(e) {
    // console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }

  private getEventDetails = (eventId) => {
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
              this.alerts = [{ code: "ERROR", systemMessage: errors }];
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
          let candidatesOfThisEvent = allCandidatesList.filter(
            (item) => item.eventId === eventId
          );
          this.getCandidateCategoryCount(candidatesOfThisEvent);
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.alerts = [{ code: "ERROR", systemMessage: errors }];
          }
        }
      )
    );
  };

  private getCandidateCategoryCount = (list): void => {
    let countOfCandidatesPerSkill = {};
    list.forEach((item) => {
      if (
        item &&
        item.skill &&
        item.skill.value &&
        countOfCandidatesPerSkill &&
        countOfCandidatesPerSkill.hasOwnProperty(item.skill.value)
      ) {
        countOfCandidatesPerSkill[item.skill.value].candidatesCount++;
      } else {
        countOfCandidatesPerSkill[item.skill.value] = {
          skill: {
            description: item.skill.description,
            value: item.skill.value,
          },
          candidatesCount: 1,
        };
      }
    });
    for (let key in countOfCandidatesPerSkill) {
      this.slides.push(countOfCandidatesPerSkill[key]);
    }
  };

  public onClickOfCarousel = (slide) => {
    if (this.onSelect) {
      this.onSelect.emit({ ...slide });
    }
  };
}
