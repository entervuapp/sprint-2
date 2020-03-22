import { Component, OnInit } from '@angular/core';
import FONT_AWESOME_ICONS_CONSTANTS from "../../constants/font-awesome-icons";

@Component({
  selector: 'app-candidate-queue',
  templateUrl: './candidate-queue.component.html',
  styleUrls: ['./candidate-queue.component.scss']
})
export class CandidateQueueComponent implements OnInit {
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  constructor() { }

  ngOnInit() {
  }

}
