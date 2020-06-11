import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-auto-complete",
  templateUrl: "./auto-complete.component.html",
  styleUrls: ["./auto-complete.component.css"],
})
export class AutoCompleteComponent implements OnInit {
  formControl: FormControl;
  skillsList: any[];
  filteredSkillList: any[];
  constructor() {}

  ngOnInit() {
    this.skillsList = ["Angular", "UI", "Dot Net", "Java", "Drupal"];
    this.filteredSkillList = [];
    this.formControl = new FormControl("", []);
    this.formControl.valueChanges.subscribe((response) => {
      if (response && response.length) {
        this.filteredSkillList = this.skillsList.filter(
          (skill) => skill.toLowerCase().indexOf(response.toLowerCase()) !== -1
        );
      } else {
        this.filteredSkillList = [];
      }
    });
  }

  public onOptionSelect = (skill) => {
    this.formControl.setValue(skill);
    this.filteredSkillList = [];
  };
}
