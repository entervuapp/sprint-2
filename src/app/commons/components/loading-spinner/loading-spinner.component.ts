import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderService } from "../../services/loader/loader.service";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnInit {
  isLoading: Subject<boolean>;
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading = this.loaderService && this.loaderService.isLoading;
  }
}
