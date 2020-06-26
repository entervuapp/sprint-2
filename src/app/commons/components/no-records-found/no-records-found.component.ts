import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-no-records-found",
  templateUrl: "./no-records-found.component.html",
  styleUrls: ["./no-records-found.component.scss"],
})
export class NoRecordsFoundComponent implements OnInit {
  @Input() message: string;
  constructor() {}

  ngOnInit() {
    this.message = this.message || "No records found.";
  }
}
