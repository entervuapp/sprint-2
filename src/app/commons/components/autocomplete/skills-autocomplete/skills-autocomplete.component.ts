import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { SkillsAutocompleteService } from "./skills-autocomplete/skills-autocomplete.service";
import { Subscription } from "rxjs";
import { ValueDescription } from "../../../typings/typings";
import ObjectUtil from "../../../utils/object-utils";

@Component({
  selector: "app-skills-autocomplete",
  templateUrl: "./skills-autocomplete.component.html",
  styleUrls: ["./skills-autocomplete.component.css"],
})
export class SkillsAutocompleteComponent implements OnInit, OnChanges {
  public formControl: FormGroup;
  private skillsList: ValueDescription[];
  public filteredSkillList: ValueDescription[];
  public isSkillHasError: boolean;
  private _subscriptions = new Subscription();

  @Input() isRequired: boolean;
  @Input() placeholderText: string;
  @Input() labelName: string;
  @Input() resetField: boolean;
  @Input() isTouched: boolean;
  @Input() renderSkill: ValueDescription;
  @Output() onSelect = new EventEmitter();
  @Output() onChange = new EventEmitter();
  constructor(
    private skillsAutocompleteService: SkillsAutocompleteService,
    private fb: FormBuilder,
    public objectUtil: ObjectUtil
  ) {}

  ngOnInit() {
    this.isSkillHasError = this.isSkillHasError || false;
    this.placeholderText = this.placeholderText || "Select skill";
    this.labelName = this.labelName || "Skill";
    this.skillsList = [];
    this.filteredSkillList = [];
    this._subscriptions.add(
      this.formControl.get("description").valueChanges.subscribe((response) => {
        if (response && response.length && response.length > 2) {
          this.filteredSkillList = this.skillsList.filter(
            (skill) =>
              skill.description
                .toLowerCase()
                .indexOf(response.toLowerCase()) !== -1
          );
        } else {
          this.filteredSkillList = [];
        }
        if (this.onChange) {
          this.onChange.emit(response);
        }
      })
    );

    this.getSkills();
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("isRequired") &&
      changes.isRequired.currentValue !== changes.isRequired.previousValue
    ) {
      this.isRequired = changes.isRequired.currentValue;
      if (this.isRequired) {
        this.formControl = this.fb.group({
          description: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
          ]),
          value: new FormControl("", [Validators.required]),
        });
      } else {
        this.formControl = this.fb.group({
          description: new FormControl("", []),
          value: new FormControl("", []),
        });
      }
    }

    if (
      changes &&
      changes.hasOwnProperty("resetField") &&
      changes.resetField.currentValue
    ) {
      this.resetField = changes.resetField.currentValue;
      this.clearField();
    }

    if (
      changes &&
      changes.hasOwnProperty("isTouched") &&
      changes.isTouched.currentValue
    ) {
      this.isTouched = changes.isTouched.currentValue;
      if (this.isTouched) {
        this.formControl.controls.description.markAsTouched();
        this.formControl.controls.value.markAsTouched();
        this.checkForError(this.formControl, "description");
      }
    }

    if (
      changes &&
      changes.hasOwnProperty("renderSkill") &&
      changes.renderSkill.currentValue
    ) {
      this.renderSkill = changes.renderSkill.currentValue;
      if (this.renderSkill) {
        this.formControl.setValue({ ...this.renderSkill });
        this.filteredSkillList = [];
      }
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public onOptionSelect = (skill: ValueDescription): void => {
    this.formControl.setValue({
      value: skill.value,
      description: skill.description,
    });
    if (this.onSelect) {
      this.onSelect.emit({
        value: this.formControl.value.value,
        description: this.formControl.value.description,
      });
    }
    this.filteredSkillList = [];
  };

  private getSkills = (): void => {
    this._subscriptions.add(
      this.skillsAutocompleteService.getSkills().subscribe(
        (response) => {
          this.skillsList = [...response];
        },
        (errors) => {
          console.log(errors);
        }
      )
    );
  };

  public checkForError(formObj: FormGroup, property: string): boolean {
    this.isSkillHasError = this.objectUtil.checkForFormErrors(
      formObj,
      property
    );
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  private clearField = (): void => {
    this.formControl.setValue({ value: "", description: "" });
    this.formControl.markAsPristine();
    this.formControl.markAsUntouched();
    this.isTouched = false;
  };
}
