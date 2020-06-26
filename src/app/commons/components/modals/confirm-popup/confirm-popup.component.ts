import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { NewAny } from "src/app/commons/typings/typings";

@Component({
  selector: "app-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.scss"],
})
export class ConfirmPopupComponent implements OnInit {
  public displayTextObject: NewAny;
  @Input() showModalPopup: boolean;

  constructor() {}

  ngOnInit() {
    this.displayTextObject = {
      heading: "Confirm alert",
      message: "Are you sure?",
      close: "Close",
    };
  }

  hideModal = () => {};
}
