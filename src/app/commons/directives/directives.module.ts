import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HighlightRequiredFieldsDirective } from "./highlight-required-fields/highlight-required-fields.directive";
import { UpperCaseDirective } from "./upper-case/upper-case.directive";
import { FocusInvalidInputDirective } from "./focus-invalid-input/focus-invalid-input.directive";
import { NumbersOnlyDirective } from "./numbers-only/numbers-only.directive";
import { FocusFirstEmptyInputDirective } from "./focus-first-empty-input/focus-first-empty-input.directive";

const DIRECTIVES_LIST = [
  HighlightRequiredFieldsDirective,
  UpperCaseDirective,
  FocusInvalidInputDirective,
  NumbersOnlyDirective,
  FocusFirstEmptyInputDirective
];

@NgModule({
  declarations: [...DIRECTIVES_LIST],
  imports: [CommonModule],
  exports: [...DIRECTIVES_LIST]
})
export class DirectivesModule {}
