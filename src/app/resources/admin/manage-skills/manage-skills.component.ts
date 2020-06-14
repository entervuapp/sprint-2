import { Component, OnInit } from "@angular/core";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ValueDescription } from "../../../commons/typings/typings";
import ObjectUtil from "../../../commons/utils/object-utils";
import { ManageSkillsService } from "./manage-skills/manage-skills.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-manage-skills",
  templateUrl: "./manage-skills.component.html",
  styleUrls: ["./manage-skills.component.css"],
})
export class ManageSkillsComponent implements OnInit {
  fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  filterSkillsList: ValueDescription[];
  originalSkillsList: ValueDescription[];
  searchSkillCardEnable: boolean;
  addSkillCardEnable: boolean;
  public displayTextObject: object;
  public addSkillForm: FormGroup;
  public skillSearchControl: FormControl;

  constructor(
    public manageHeaderService: ManageHeaderService,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private manageSkillsService: ManageSkillsService
  ) {}

  ngOnInit() {
    this.displayTextObject = {
      searchSkill: "Search Skill",
    };
    this.initializeForm();
    this.searchSkillCardEnable = true;
    this.addSkillCardEnable = false;
    this.originalSkillsList = [];
    this.filterSkillsList = [];
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.getSkills();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (): void => {
    this.skillSearchControl = new FormControl("");
    this.addSkillForm = this.fb.group({
      id: new FormControl(null, []),
      value: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  };

  public adminAddSkillEnable = (): void => {
    this.searchSkillCardEnable = false;
    this.addSkillCardEnable = true;
  };

  public adminSearchEnable = (): void => {
    this.searchSkillCardEnable = true;
    this.addSkillCardEnable = false;
  };

  public checkForError(formObj, property): boolean {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onCreate = (): void => {
    let requestBody = { ...this.addSkillForm.value };
    this.resetAddForm();
    if (requestBody && requestBody.id) {
      this._subscriptions.add(
        this.manageSkillsService.updateSkill(requestBody).subscribe(
          (response) => {
            this.getSkills();
          },
          (errors) => {
            if (errors) {
              console.log(errors);
            }
          }
        )
      );
    } else {
      this._subscriptions.add(
        this.manageSkillsService.createSkill(requestBody).subscribe(
          (response) => {
            this.getSkills();
          },
          (errors) => {
            if (errors) {
              console.log(errors);
            }
          }
        )
      );
    }
  };

  private getSkills = (): void => {
    this._subscriptions.add(
      this.manageSkillsService.getSkills().subscribe(
        (response) => {
          this.originalSkillsList = [...response];
          this.filterSkillsList = [...response];
        },
        (errors) => {
          if (errors) {
            console.log(errors);
          }
        }
      )
    );
  };

  public onEditOfSkill = (skill): void => {
    this.addSkillCardEnable = true;
    this.searchSkillCardEnable = false;
    this.addSkillForm.patchValue({
      id: skill && skill.id ? skill.id : null,
      value: skill && skill.value ? skill.value : "",
      description: skill && skill.description ? skill.description : "",
    });
  };

  public onDeleteOfSkill = (skill): void => {
    if (skill && skill.id) {
      this._subscriptions.add(
        this.manageSkillsService.deleteEvent(skill.id).subscribe(
          (response) => {
            this.getSkills();
          },
          (errors) => {
            if (errors) {
              console.log(errors);
            }
          }
        )
      );
    }
  };

  private resetAddForm = (): void => {
    this.initializeForm();
    this.addSkillForm.controls.value.markAsUntouched();
    this.addSkillForm.controls.value.markAsPristine();
    this.addSkillForm.controls.description.markAsUntouched();
    this.addSkillForm.controls.description.markAsPristine();
    this.addSkillForm.reset();
  };

  public onSearch = (): void => {
    if (this.skillSearchControl.value) {
      this.filterSkillsList = this.originalSkillsList.filter(
        (skill) =>
          skill["description"]
            .toLowerCase()
            .indexOf(this.skillSearchControl.value.toLowerCase()) !== -1 ||
          skill["value"]
            .toLowerCase()
            .indexOf(this.skillSearchControl.value.toLowerCase()) !== -1
      );
    } else {
      this.filterSkillsList = [...this.originalSkillsList];
    }
  };
}
