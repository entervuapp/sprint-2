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
import { ObjectUtil } from "../../../commons/utils/object-utils";
import { ManageSkillsService } from "./manage-skills/manage-skills.service";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";

@Component({
  selector: "app-manage-skills",
  templateUrl: "./manage-skills.component.html",
  styleUrls: ["./manage-skills.component.css"],
})
export class ManageSkillsComponent implements OnInit {
  public fontAwesome = FONT_AWESOME_ICONS_CONSTANTS;
  private _subscriptions = new Subscription();
  public filterSkillsList: ValueDescription[];
  public searchSkillCardEnable: boolean;
  public addSkillCardEnable: boolean;
  public displayTextObject: object;
  public addSkillForm: FormGroup;
  public skillSearchControl: FormControl;
  public SHARED_CONSTANTS;

  constructor(
    public manageHeaderService: ManageHeaderService,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    private manageSkillsService: ManageSkillsService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      searchSkill: "Search Skill",
      addSkills: "Add skills",
      skillSearch: "Skill search",
      skillId: "Skill ID",
      skillName: "Skill name",
      update: "Update",
      create: "Create",
    };
    this.initializeForm();
    this.searchSkillCardEnable = true;
    this.addSkillCardEnable = false;
    this.filterSkillsList = [];
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.getSkills();
    this.skillSearchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.onSearch(value);
        } else {
          this.getSkills();
        }
      });
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
        (data) => {
          this.filterSkillsList = [...data.response];
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
      let requestBody = {
        skillId: skill.id,
      };
      this._subscriptions.add(
        this.manageSkillsService.deleteSkill(requestBody).subscribe(
          (response) => {
            this.getSkills();
          },
          (errors) => {
            if (errors) {
              console.log(errors);
              this.objectUtil.showAlert([
                ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
              ]);
            }
          }
        )
      );
    }
  };

  private resetAddForm = () => {
    setTimeout(() => {
      this.addSkillForm.reset();
    }, 100);
  };

  public onSearch = (value): void => {
    if (value) {
      let requestBody = {
        value: value,
      };
      this._subscriptions.add(
        this.manageSkillsService.findSkills(requestBody).subscribe(
          (data) => {
            if (data && data.response && data.response.length) {
              this.filterSkillsList = data["response"];
            } else {
              this.filterSkillsList = [];
            }
          },
          (errors) => {
            if (errors) {
              console.log(errors);
              this.objectUtil.showAlert([
                ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
              ]);
            }
          }
        )
      );
    }
  };

  public onBlurOfSkillId = (): void => {
    let filteredList = [];
    if (
      this.addSkillForm &&
      this.addSkillForm.controls &&
      this.addSkillForm.controls.value &&
      this.addSkillForm.controls.value.value
    ) {
      filteredList = this.filterSkillsList.filter(
        (skill) =>
          skill.value.toLowerCase() ===
          this.addSkillForm.controls.value.value.toLowerCase()
      );
    }
    if (filteredList && filteredList.length) {
      this.addSkillForm.controls.value.setErrors({ duplicate: true });
    } else {
      this.addSkillForm.controls.value.hasError("duplicate")
        ? this.addSkillForm.controls.value.setErrors(null)
        : "";
    }
  };

  public onBlurOfSkillName = (): void => {
    let filteredList = [];
    if (
      this.addSkillForm &&
      this.addSkillForm.controls &&
      this.addSkillForm.controls.description &&
      this.addSkillForm.controls.description.value
    ) {
      this.addSkillForm.controls.value.setValue(
        this.addSkillForm.controls.value.value.toUpperCase()
      );
      filteredList = this.filterSkillsList.filter(
        (skill) =>
          skill.description.toLowerCase() ===
          this.addSkillForm.controls.description.value.toLowerCase()
      );
    }
    if (filteredList && filteredList.length) {
      this.addSkillForm.controls.description.setErrors({ duplicate: true });
    } else {
      this.addSkillForm.controls.description.hasError("duplicate")
        ? this.addSkillForm.controls.description.setErrors(null)
        : "";
    }
  };

  public hasCapability = (task): boolean => {
    return this.objectUtil.isAuthorized(task);
  };
}
