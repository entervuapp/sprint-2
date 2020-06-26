import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NewAny } from "../../typings/typings";

@Component({
  selector: "app-login-logo-slider",
  templateUrl: "./login-logo-slider.component.html",
  styleUrls: ["./login-logo-slider.component.scss"],
})
export class LoginLogoSliderComponent implements OnInit {
  public displayTextObject: NewAny;

  @Output() onSelect = new EventEmitter();
  @Output() showAboutUs = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.displayTextObject = {
      organization: "Organization",
      individual: "Individual",
      aboutUs: "About us",
      copyRight: "Copyright &copy; 2019 EnterVu, All rights reserved.",
    };
  }

  public addSlideOneClass = (event): void => {
    let id = event.target.id;
    var ele = document.getElementById("slideOne");
    if (ele && ele.classList.contains("loginCard_rightSlideEffect") === false) {
      ele.classList.add("loginCard_rightSlideEffect");
    }
    if (this.onSelect) {
      this.onSelect.emit({ buttonName: id });
    }
  };

  public removeSlideOneClass = (event): void => {
    var ele = document.getElementById("slideOne");
    ele.classList.remove("loginCard_rightSlideEffect");
    if (this.showAboutUs) {
      this.showAboutUs.emit();
    }
  };
}
