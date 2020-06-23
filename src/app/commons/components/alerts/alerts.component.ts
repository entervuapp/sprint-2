import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"],
})
export class AlertsComponent implements OnInit, OnChanges {
  @Input() alertsList: any[];
  @Output() onClose = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.alertsList = this.alertsList || [];
  }

  ngOnChanges(changes) {
    if (
      changes &&
      changes.hasOwnProperty("alertsList") &&
      changes.alertsList.currentValue
    ) {
      this.alertsList = changes.alertsList.currentValue;
    }
  }

  public close = (idx): void => {
    if (this.onClose) {
      this.onClose.emit(idx);
    }
  };
}
