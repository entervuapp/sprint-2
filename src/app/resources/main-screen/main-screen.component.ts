import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-screen",
  templateUrl: "./main-screen.component.html",
  styleUrls: ["./main-screen.component.scss"]
})
export class MainScreenComponent implements OnInit {
  activated: string;
  handleFormsDisplay: {};
  constructor() {}

  ngOnInit() {
    this.activated = "whatWeAre";
    this.handleFormsDisplay = {
      organizationRegistration: false,
      individualRegistration: false,
      login: false,
      organization: false,
      individual: false
    };
  }

  handleAboutUsAndContactUs = event => {
    console.log("handle about contact", event.target.id);
    this.activated = event.target.id;
  };

  handleViewOnSlide = event => {
    if (event && event.buttonName === "organizationButton") {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: false,
        login: true,
        organization: true,
        individual: false
      };
    } else {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: false,
        login: true,
        organization: false,
        individual: true
      };
    }
  };

  handleSignUpDisplay = () => {
    if (this.handleFormsDisplay && this.handleFormsDisplay["organization"]) {
      this.handleFormsDisplay = {
        organizationRegistration: true,
        individualRegistration: false,
        login: false,
        organization: true,
        individual: false
      };
    } else {
      this.handleFormsDisplay = {
        organizationRegistration: false,
        individualRegistration: true,
        login: false,
        organization: false,
        individual: true
      };
    }
  };

  showLoginScreen = () => {
    this.handleFormsDisplay["login"] = true;
  };
}
