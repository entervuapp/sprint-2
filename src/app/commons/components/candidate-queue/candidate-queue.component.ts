import { Component, OnInit, Input } from "@angular/core";
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";
import { SkillWithCount } from "../../typings/typings";

@Component({
  selector: "app-candidate-queue",
  templateUrl: "./candidate-queue.component.html",
  styleUrls: ["./candidate-queue.component.scss"],
})
export class CandidateQueueComponent implements OnInit {
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  @Input() selectedSlide: SkillWithCount;
  constructor() {}

  ngOnInit() {}
}
