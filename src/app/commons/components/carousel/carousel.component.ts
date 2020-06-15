import { Component, OnInit, ElementRef } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
})
export class CarouselComponent implements OnInit {
  fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  title = "ngSlick";
  slides: any[];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.slides = [
      { InterviewName: "Java", members: 150 },
      { InterviewName: "Dot Net", members: 150 },
      { InterviewName: "UI", members: 150 },
      { InterviewName: "Drupal", members: 150 },
      { InterviewName: "SAP", members: 150 },
      { InterviewName: "PHP", members: 150 },
      { InterviewName: "Testing", members: 150 },
      { InterviewName: "Angular", members: 150 },
      { InterviewName: "React", members: 150 },
      { InterviewName: "Team Lead", members: 150 },
    ];
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
    this.slides.push(488);
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
}
