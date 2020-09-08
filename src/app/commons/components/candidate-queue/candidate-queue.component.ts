import { Component, OnInit, Input, OnChanges } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { SkillAndRound, SkillWithCount } from "../../typings/typings";
import { NewAny } from "../../typings/typings";

@Component({
  selector: "app-candidate-queue",
  templateUrl: "./candidate-queue.component.html",
  styleUrls: ["./candidate-queue.component.scss"],
})
export class CandidateQueueComponent implements OnInit, OnChanges {
  public fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  public currentSlideWithSkill: SkillAndRound;
  public roundsList: any;
  public filteredCandidateList: any[];
  public displayTextObject: NewAny;

  @Input() selectedSlide: SkillWithCount;
  @Input() eventDetails: object;
  @Input() candidatesList: any[];

  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    this.displayTextObject = {
      queueTableHeaderList: ["Queue No.", "Name", "Status", "Actions"],
      candidateActionsMenu: [
        { displayText: "Break Status", dataTarget: "breakStatusPopup" },
        { displayText: "Leaving for the day", dataTarget: "leaveForDayPopup" },
        { displayText: "Feedback", dataTarget: "feedbackPopup" },
      ],
      breakStatus: "Break status",
      email: "Email",
      comment: "Comment",
      close: "Close",
      submit: "Submit",
      feedback: "Feedback",
      enterTime: "Enter time",
    };
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("selectedSlide") &&
      changes.selectedSlide.currentValue
    ) {
      this.selectedSlide = changes.selectedSlide.currentValue;
      this.prepareRoundsDisplay();
    }

    if (
      changes &&
      changes.hasOwnProperty("eventDetails") &&
      changes.eventDetails.currentValue
    ) {
      this.eventDetails = changes.eventDetails.currentValue;
      this.prepareRoundsDisplay();
    }

    if (
      changes &&
      changes.hasOwnProperty("candidatesList") &&
      changes.candidatesList.currentValue
    ) {
      this.candidatesList = changes.candidatesList.currentValue;
    }
  }

  private prepareRoundsDisplay = (): void => {
    if (
      this.selectedSlide &&
      this.eventDetails &&
      this.eventDetails["eventSkills"] &&
      this.eventDetails["eventSkills"].length
    ) {
      this.currentSlideWithSkill = this.eventDetails["eventSkills"].find(
        (eachSkill) =>
          eachSkill["skill"].value === this.selectedSlide.skill.value
      );
      this.roundsList = [];
      if (
        this.currentSlideWithSkill &&
        this.currentSlideWithSkill["roundDetails"] &&
        this.currentSlideWithSkill["roundDetails"].length
      ) {
        this.currentSlideWithSkill["roundDetails"].map((eachRound, i) => {
          let eachRoundDetails = {
            active: i === 0 ? true : false,
            ...eachRound,
            skill: { ...this.currentSlideWithSkill.skill },
          };
          this.roundsList.push(eachRoundDetails);
        });
      } else {
        console.log("a");
      }
      this.filterCandidateAsPerRound();
    }
  };

  public onRoundsTabClick = (roundObj): void => {
    roundObj.active = true;
    this.roundsList.forEach((round) => {
      if (round.id === roundObj.id) {
        round.active = true;
      } else {
        round.active = false;
      }
    });
    this.filterCandidateAsPerRound();
  };

  private filterCandidateAsPerRound = (): void => {
    this.roundsList.map((eachRound) => {
      if (eachRound.active) {
        this.filteredCandidateList = eachRound.candidates;
      }
    });
  };
}
