import { Component, OnInit } from "@angular/core";
import { NewAny } from "../../typings/typings";
@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  public displayTextObject: NewAny;
  constructor() {}

  ngOnInit() {
    this.displayTextObject = {
      message: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also
      the leap into electronic typesetting, remaining essentially unchanged`,
    };
  }
}
