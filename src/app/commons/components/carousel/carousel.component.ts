import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { Subscription } from "rxjs";
import { Alerts, SkillWithCount } from "../../typings/typings";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})
export class CarouselComponent implements OnInit, OnChanges {
  fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  slides: SkillWithCount[];
  private _subscriptions = new Subscription();
  public alerts: Alerts[];
  public slideConfig: object;

  @Input() eventDetails: object;
  @Input() candidatesList: any[];
  @Output() onSelect = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.slides = [];
    this.slideConfig = {
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
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("eventDetails") &&
      changes.eventDetails.currentValue
    ) {
      this.eventDetails = changes.eventDetails.currentValue;
    }
    if (
      changes &&
      changes.hasOwnProperty("candidatesList") &&
      changes.candidatesList.currentValue
    ) {
      this.candidatesList = changes.candidatesList.currentValue;
      this.getCandidateCategoryCount(this.candidatesList);
    }
  }

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
    this.onSelect.emit({ ...this.slides[0] });
  };

  public onClickOfCarousel = (slide): void => {
    if (this.onSelect) {
      this.onSelect.emit({ ...slide });
    }
  };
}
