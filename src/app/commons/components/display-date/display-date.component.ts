import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-display-date",
  templateUrl: "./display-date.component.html",
  styleUrls: ["./display-date.component.css"],
})
export class DisplayDateComponent implements OnInit, OnChanges {
  @Input() dateInput: string;
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.dateInput =
      (this.dateInput &&
        this.datePipe.transform(this.dateInput, "MM/dd/yyyy")) ||
      null;
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("dateInput") &&
      changes.dateInput.currentValue !== changes.dateInput.previousValue
    ) {
      this.dateInput = changes.dateInput.currentValue;
      this.dateInput =
        (this.dateInput &&
          this.datePipe.transform(this.dateInput, "MM/dd/yyyy")) ||
        null;
    }
  }
}
