import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"]
})
export class AlertsComponent implements OnInit {
  @Input() alertsList: any[];

  constructor() {}

  ngOnInit() {
    this.alertsList = this.alertsList || [];
  }

  onClose = idx => {
    this.alertsList.splice(idx, 1);
  };
}
