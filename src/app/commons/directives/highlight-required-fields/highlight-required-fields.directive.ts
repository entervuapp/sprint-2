import { Directive, HostListener, Input } from "@angular/core";
import { FormControl, FormGroup, FormArray } from "@angular/forms";
@Directive({
  selector: "[appHighlightRequiredFields]",
})
export class HighlightRequiredFieldsDirective {
  constructor() {}

  @Input("formGroup") formObj;

  @HostListener("submit")
  onFormSubmit() {
    this.markAllRequiredFieldsAsTouched(this.formObj);
  }

  markAllRequiredFieldsAsTouched = (formGroup) => {
    if (formGroup && formGroup.controls) {
      Object.keys(formGroup.controls).forEach((eachControlName) => {
        if (formGroup.controls[eachControlName] instanceof FormControl) {
          formGroup.controls[eachControlName].markAsTouched({ onlySelf: true });
        } else if (formGroup.controls[eachControlName] instanceof FormGroup) {
          this.markAllRequiredFieldsAsTouched(
            formGroup.controls[eachControlName]
          );
        } else if (formGroup.controls[eachControlName] instanceof FormArray) {
          formGroup.controls[eachControlName]["controls"].forEach(
            (eachFormGroup) => {
              this.markAllRequiredFieldsAsTouched(eachFormGroup);
            }
          );
        }
      });
    }
  };
}
