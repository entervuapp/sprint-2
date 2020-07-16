import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { EmailAutocompleteService } from "./email-autocomplete/email-autocomplete.service";
import ObjectUtil from "../../../utils/object-utils";
import { SHARED_CONSTANTS } from "../../../constants/shared.constants";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-email-autocomplete",
  templateUrl: "./email-autocomplete.component.html",
  styleUrls: ["./email-autocomplete.component.css"],
})
export class EmailAutocompleteComponent implements OnInit, OnChanges {
  public emailList: any[];
  public formGroup: FormGroup;
  public SHARED_CONSTANTS;
  public displayTextObject: object;
  private optionSelected: boolean;

  @Input() isRequired: boolean;
  @Input() isTouched: boolean;
  @Input() resetField: boolean;
  @Output() onSelect = new EventEmitter();

  constructor(
    private emailAutocompleteService: EmailAutocompleteService,
    private objectUtil: ObjectUtil,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.optionSelected = false;
    this.displayTextObject = {
      placeholder: "Email",
    };
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.formGroup.controls.email.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length > 2 && !this.optionSelected) {
          this.fetchEmails(value);
        } else {
          this.optionSelected = false;
          this.emailList = [];
        }
      });
  }

  ngOnChanges(changes): void {
    if (
      changes &&
      changes.hasOwnProperty("isTouched") &&
      changes.isTouched.currentValue !== changes.isTouched.previousValue
    ) {
      this.isTouched = changes.isTouched.currentValue;
      this.isTouched ? this.formGroup.controls.email.markAsTouched() : "";
    }

    if (
      changes &&
      changes.hasOwnProperty("resetField") &&
      changes.resetField.currentValue !== changes.resetField.previousValue
    ) {
      this.resetField = changes.resetField.currentValue;
      this.emailList = [];
      this.initializeForm();
    }

    if (
      changes &&
      changes.hasOwnProperty("isRequired") &&
      changes.isRequired.currentValue !== changes.isRequired.previousValue
    ) {
      this.isRequired = changes.isRequired.currentValue;
      this.initializeForm();
    }
  }

  private initializeForm = (): void => {
    if (this.isRequired) {
      this.formGroup = this.fb.group({
        client: new FormGroup({
          clientName: new FormControl("", []),
          clientSecret: new FormControl("", []),
          id: new FormControl("", []),
        }),
        email: new FormControl("", [Validators.required]),
        emailVerified: new FormControl("", []),
        firstName: new FormControl("", []),
        id: new FormControl("", [Validators.required]),
        lastName: new FormControl("", []),
        imageUrl: new FormControl("", []),
        organization: new FormControl("", []),
        provider: new FormControl("", []),
        providerId: new FormControl("", []),
        roles: new FormArray([this.prepateRolesFormGroup()]),
      });
    } else {
      this.formGroup = this.fb.group({
        client: new FormGroup({
          clientName: new FormControl("", []),
          clientSecret: new FormControl("", []),
          id: new FormControl("", []),
        }),
        email: new FormControl("", []),
        emailVerified: new FormControl("", []),
        firstName: new FormControl("", []),
        id: new FormControl("", []),
        lastName: new FormControl("", []),
        imageUrl: new FormControl("", []),
        organization: new FormControl("", []),
        provider: new FormControl("", []),
        providerId: new FormControl("", []),
        roles: new FormArray([this.prepateRolesFormGroup()]),
      });
    }
  };

  public fetchEmails = (text): void => {
    this.emailAutocompleteService.findCandidateByEmail(text).subscribe(
      (data) => {
        if (data && data["response"] && data["response"].length > 0) {
          this.emailList = [...data["response"]];
        } else {
          this.emailList = [];
        }
      },
      (errors) => {
        if (errors) {
          console.log("errors", errors);
          this.objectUtil.showAlert(
            this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
          );
        }
      }
    );
  };

  public checkForError(formObj, property: string): boolean {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onEmailOptionSelect = (user): void => {
    if (user) {
      this.formGroup.patchValue({
        ...user,
      });
      this.optionSelected = true;
      this.emailList = [];
      if (this.onSelect) {
        this.onSelect.emit({ ...user });
      }
    }
  };

  private prepateRolesFormGroup = (): FormGroup => {
    return new FormGroup({
      id: new FormControl("", []),
      name: new FormControl("", []),
    });
  };
}
