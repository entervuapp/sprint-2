import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-login-logo-slider",
  templateUrl: "./login-logo-slider.component.html",
  styleUrls: ["./login-logo-slider.component.scss"]
})
export class LoginLogoSliderComponent implements OnInit {
  @Output() onSelect = new EventEmitter();
  @Output() showAboutUs = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  addSlideOneClass = event => {
    let id = event.target.id;
    var ele = document.getElementById("slideOne");
    if (ele && ele.classList.contains("loginCard_rightSlideEffect") === false) {
      ele.classList.add("loginCard_rightSlideEffect");
    }
    if (this.onSelect) {
      this.onSelect.emit({ buttonName: id });
    }
  };

  removeSlideOneClass = event => {
    var ele = document.getElementById("slideOne");
    ele.classList.remove("loginCard_rightSlideEffect");
    if (this.showAboutUs) {
      this.showAboutUs.emit();
    }
  };
}
