import { Directive, HostListener, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Directive({
  selector: "[appHighlightRequiredFields]"
})
export class HighlightRequiredFieldsDirective {
  constructor() {}

  @Input("formGroup") formObj;

  @HostListener("submit")
  onFormSubmit() {
    this.markAllRequiredFieldsAsTouched();
  }

  markAllRequiredFieldsAsTouched = () => {
    if (this.formObj && this.formObj.controls) {
      Object.keys(this.formObj.controls).forEach(eachControlName => {
        if (this.formObj.controls[eachControlName] instanceof FormControl) {
          this.formObj.controls[eachControlName].markAsTouched();
        } else if (
          this.formObj.controls[eachControlName] instanceof FormGroup
        ) {
          this.markAllRequiredFieldsAsTouched();
        }
      });
    }
  };
}
