import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  adminSkillList : any[];
  adminSearchCardEnable: boolean;
  adminAddSkillCardEnable: boolean;

  constructor(public manageHeaderService: ManageHeaderService) {}

  ngOnInit() {
    this.adminSearchCardEnable = true;
    this.adminAddSkillCardEnable = false;
    this.adminSkillList = [
      { id: 101, skillName: "Angular" },
      { id: 102, skillName: "UI" },
      { id: 103, skillName: "Java" },
      { id: 104, skillName: "DOt Net" },
      { id: 105, skillName: "Drupal" },
      { id: 106, skillName: "Php" },
    ]
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }

  adminAddSkillEnable(){
    this.adminSearchCardEnable = false;
    this.adminAddSkillCardEnable = true;
  }

  adminSearchEnable(){
    this.adminSearchCardEnable = true;
    this.adminAddSkillCardEnable = false;
  }  

}
