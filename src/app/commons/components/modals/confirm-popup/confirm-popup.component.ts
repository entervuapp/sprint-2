import { Component, OnInit, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.scss"]
})
export class ConfirmPopupComponent implements OnInit {
  displayTextObj: {};
  @Input() showModalPopup: boolean;
  constructor() {}

  ngOnInit() {
    this.displayTextObj = {
      heading: "Confirm alert",
      message: "Are you sure?"
    };
    console.log("showModalPopup", this.showModalPopup);
  }

  ngOnChanges(changes) {
    console.log("changes ", changes);
  }

  hideModal = () => {};
}
