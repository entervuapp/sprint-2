import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../services/manage-header/manage-header.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }
}
