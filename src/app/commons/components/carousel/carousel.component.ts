import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Subscription } from "rxjs";
import { SkillWithCount, NewAny } from "../../typings/typings";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})
export class CarouselComponent implements OnInit, OnChanges {
  public slides: SkillWithCount[];
  public displayTextObject: NewAny;
  private _subscriptions = new Subscription();
  public slideConfig: object;

  @Input() eventDetails: object;
  @Input() candidatesList: any[];
  @Output() onSelect = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.displayTextObject = {
      todayInterviewList: "Today Interviews List",
    };
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

  public addSlide(): void {
    this.slides.push();
  }

  public removeSlide(): void {
    this.slides.length = this.slides.length - 1;
  }

  public slickInit(e): void {
    // console.log("slick initialized");
  }

  public breakpoint(e): void {
    // console.log("breakpoint");
  }

  public afterChange(e): void {
    // console.log("afterChange");
  }

  public beforeChange(e): void {
    // console.log("beforeChange");
  }

  private getCandidateCategoryCount = (list): void => {
    const countOfCandidatesPerSkill = {};
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

    for (const key in countOfCandidatesPerSkill) {
      if (countOfCandidatesPerSkill.hasOwnProperty(key)) {
        this.slides.push(countOfCandidatesPerSkill[key]);
      }
    }
    if (this.onSelect) {
      this.onSelect.emit({ ...this.slides[0] });
    }
  };

  public onClickOfCarousel = (slide): void => {
    if (this.onSelect) {
      this.onSelect.emit({ ...slide });
    }
  };
}
