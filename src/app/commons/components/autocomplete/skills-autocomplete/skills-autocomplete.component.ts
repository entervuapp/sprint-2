import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SkillsAutocompleteService } from "./skills-autocomplete/skills-autocomplete.service";
import { Subscription } from "rxjs";
import { ValueDescriptionId, NewAny } from "../../../typings/typings";
import { ObjectUtil } from "../../../utils/object-utils";
import { SHARED_CONSTANTS } from "../../../constants/shared.constants";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../constants/font-awesome-icons";

@Component({
  selector: "app-skills-autocomplete",
  templateUrl: "./skills-autocomplete.component.html",
  styleUrls: ["./skills-autocomplete.component.css"],
})
export class SkillsAutocompleteComponent implements OnInit, OnChanges {
  public formGroup: FormGroup;
  public FONT_AWESOME_ICONS_CONSTANTS;
  private skillsList: ValueDescriptionId[];
  public filteredSkillList: ValueDescriptionId[];
  private _subscriptions = new Subscription();
  public displayTextObject: NewAny;
  public SHARED_CONSTANTS;

  @Input() isRequired: boolean;
  @Input() placeholderText: string;
  @Input() labelName: string;
  @Input() resetField: boolean;
  @Input() isTouched: boolean;
  @Input() renderSkill: ValueDescriptionId;
  @Output() onSelect = new EventEmitter();
  @Output() onChange = new EventEmitter();
  constructor(
    private skillsAutocompleteService: SkillsAutocompleteService,
    public objectUtil: ObjectUtil
  ) {}

  ngOnInit() {
    this.FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
    this.placeholderText = this.placeholderText || "Skill";
    this.isRequired = this.isRequired || false;
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.displayTextObject = {
      skill: "Skill",
    };
    this.filteredSkillList = [];
    this.skillsList = [];
    this.initializeForm(this.isRequired);
    this.getSkills();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnChanges(changes): void {
    console.log(changes);
    if (
      changes &&
      changes.hasOwnProperty("isTouched") &&
      changes.isTouched.currentValue !== changes.isTouched.previousValue
    ) {
      this.isTouched = changes.isTouched.currentValue;
      this.isTouched ? this.formGroup.controls.description.markAsTouched() : "";
    }
  }

  private initializeForm = (isRequired): void => {
    if (isRequired) {
      this.formGroup = new FormGroup({
        value: new FormControl("", [Validators.required]),
        id: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
      });
    } else {
      this.formGroup = new FormGroup({
        value: new FormControl("", []),
        id: new FormControl("", []),
        description: new FormControl("", []),
      });
    }
  };

  public checkForError(formObj: FormGroup, property: string): boolean {
    // this.isSkillHasError = this.objectUtil.checkForFormErrors(
    //   formObj,
    //   property
    // );
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  private getSkills = (): void => {
    this._subscriptions.add(
      this.skillsAutocompleteService.getSkills().subscribe(
        (data) => {
          this.skillsList = [...data.response];
        },
        (errors) => {
          if (errors) {
            console.log("errors", errors);
            this.objectUtil.showAlert(
              this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
            );
          }
        }
      )
    );
  };

  public onSkillChange = (): void => {
    if (
      this.formGroup.controls.description.value &&
      this.formGroup.controls.description.value.length &&
      this.formGroup.controls.description.value.length > 2
    ) {
      this.filteredSkillList = this.skillsList.filter(
        (skill) =>
          skill.description
            .toLowerCase()
            .indexOf(
              this.formGroup.controls.description.value.toLowerCase()
            ) !== -1
      );
    } else {
      this.filteredSkillList = [];
    }
  };

  public onSkillOptionSelect = (skill: ValueDescriptionId): void => {
    if (skill) {
      this.formGroup.setValue({
        value: skill.value,
        id: skill.id,
        description: skill.description,
      });
      this.filteredSkillList = [];
      if (this.onSelect) {
        this.onSelect.emit({ ...skill });
      }
    }
  };
}
