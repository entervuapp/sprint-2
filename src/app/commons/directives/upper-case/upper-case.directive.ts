import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appUpperCase]"
})
export class UpperCaseDirective {
  constructor() {}

  @HostListener("keyup", ["$event"])
  onKeyup(evt: KeyboardEvent) {
    evt.target["value"] = evt.target["value"].toUpperCase();
  }
}
