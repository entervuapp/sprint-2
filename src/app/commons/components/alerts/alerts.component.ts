import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"],
})
export class AlertsComponent implements OnInit, OnChanges {
  @Input() alertsList: any[];
  @Output() onClose = new EventEmitter();

  @ViewChild("alertCloseBtn") alertCloseBtn: ElementRef;

  constructor() {}

  ngOnInit() {
    this.alertsList = this.alertsList || [];
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("alertsList") &&
      changes.alertsList.currentValue
    ) {
      if (changes.alertsList.currentValue.length) {
        this.alertsList = changes.alertsList.currentValue;
        setTimeout(() => {
          this.alertCloseBtn.nativeElement.focus();
        }, 0);
      } else {
        this.alertsList = [];
      }
    }
  }

  public close = (idx): void => {
    if (this.onClose && idx + 1) {
      this.onClose.emit(idx);
    }
  };
}
