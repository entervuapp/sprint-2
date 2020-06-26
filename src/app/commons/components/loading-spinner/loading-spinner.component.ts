import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderService } from "../../services/loader/loader.service";
import { NewAny } from "../../typings/typings";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnInit {
  public isLoading: Subject<boolean>;
  public displayTextObject: NewAny;
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.displayTextObject = {
      loading: "Loading...",
    };
    this.isLoading = this.loaderService && this.loaderService.isLoading;
  }
}
