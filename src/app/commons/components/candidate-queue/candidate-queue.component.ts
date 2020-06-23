import { Component, OnInit, Input, OnChanges } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { SkillAndRound, SkillWithCount } from "../../typings/typings";

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
  @Input() selectedSlide: SkillWithCount;
  @Input() eventDetails: object;
  @Input() candidatesList: any[];

  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
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
      this.eventDetails["skillsList"] &&
      this.eventDetails["skillsList"].length
    ) {
      this.currentSlideWithSkill = this.eventDetails["skillsList"].find(
        (skillObj) => skillObj["skill"].value === this.selectedSlide.skill.value
      );
      this.roundsList = [];
      for (let i = 0; i < this.currentSlideWithSkill.numberOfRounds; i++) {
        let temp = {
          active: i === 0 ? true : false,
          displayText: "Round " + (i + 1),
          id: i + 1,
        };
        this.roundsList.push(temp);
      }
      this.filterCandidateAsPerRound({ id: 1 });
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
    this.filterCandidateAsPerRound(roundObj);
  };

  private filterCandidateAsPerRound = (roundObj): void => {
    this.filteredCandidateList = this.candidatesList
      .filter(
        (candidate) => candidate.skill.value === this.selectedSlide.skill.value
      )
      .filter((candidate) => candidate.inRound === roundObj.id);
  };
}
